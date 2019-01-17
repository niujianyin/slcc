<template>
  <div id="app">
     <m-header navIdx="-1"></m-header>
     <div class="content" id="content" v-loading="loading" ref="content">
       <div class="gray-placeholder"></div>
       <div class="pdt-info wrap" v-if="pdtInfo">
         <div class="pdt-head">
           <span class="pdt-head-icon"></span>
           <span class="pdt-head-text">订单支付</span>
         </div>
         <div class="pdt-main">
           <div class="pdt-table">
             <div class="thead clearfix">
               <div class="td230">订单号</div>
               <div class="td170">商品名称</div>
               <div class="td360">商品详情</div>
               <div class="td150">价格</div>
             </div>
             <div class="tbody clearfix">
               <div class="td230">{{pdtInfo.orderLogNo}}</div>
               <div class="td170">{{getTitle(pdtInfo.title)}}</div>
               <div class="td360">{{pdtInfo.gameType_cn}}</div>
               <div class="td150 pdt-price">{{_getPrice(pdtInfo.salePrice)}}</div>
             </div>
           </div>
         </div>

         <div class="pdt-box">
           <div class="pdt-tips">本平台仅提供预测，不售卖彩票</div>
           <div class="pdt-pay-info">
             <div class="pay-meet">
               <div class="pay-left">应付金额</div>
               <div class="pay-right">{{_getPrice(pdtInfo.salePrice)}}</div>
             </div>
             <div class="pay-use">
               <div class="pay-left"><span class="btn-use-balance" :class="useBalance? 'selected': ''" @click="_toggleUseBalance()"></span>账户可用余额</div>
               <div class="pay-right">
                 {{_getPrice(pdtInfo.balance)}}
               </div>
             </div>
             <div class="pay-other">
               <div class="pay-left">另需支付</div>
               <div class="pay-right"><span class="pay-sybmol">￥</span>{{realPrice}}</div>
             </div>
           </div>
           <div class="pay-way" :class="{'pay-way-no': isNoPay}">
             <a href="javascript:;" @click="_selectWx()" class="pay-way-btn pay-way-wx" :class="{'selected': isWx}">微信支付</a>
             <a href="javascript:;" @click="_selectZfb()" class="pay-way-btn pay-way-zfb" :class="{'selected': isZfb}">支付宝支付</a>
           </div>
           <div class="pdt-bottom">
             <input type="checkbox" class="relief-read" v-model="agreement">
             <label class="relief" @click="_showRelief()">我已阅读《平台-用户使用协议及免责声明》</label>
             <a href="javascript:;" class="btn-go-pay" :class="{'no': !agreement}" @click="_goPay()"></a>
           </div>
         </div>
       </div>
       <no-result :title="noResultText" v-if="noResult"></no-result>
     </div>
     <relief v-if="relief" @close="_hideRelief()"></relief>
  </div>
</template>

<script type="text/ecmascript-6">
  import {baseMixin} from 'common/js/mixin'
  import MHeader from 'components/m-header/m-header'
  import Relief from 'components/relief/relief'

  import {ERR_OK, PAGEURLS} from 'common/const/config'
  import {ERR_CODE} from 'common/const/code'
  import {getQueryString, openPage, goPage, goLoginIsBack, viewData} from 'common/js/util'
  import {checkLocalLogin, getLocalJWT, deleteLocalUserInfo}  from 'common/js/cache'

  import {createOrder,sendCharge, queryCharge}  from 'api/aiPay'
  import toast from 'common/js/toast'

  let pdtIds = getQueryString('pdtIds')
  let pdtType = getQueryString('pdtType')

  const WAYZFB = 4
  const WAYWX = 5

  export default {
    name: 'App',
    mixins: [baseMixin],
    data() {
      return {
        loading: true,
        noResultText: '',
        pdtIds: pdtIds,
        pdtType: pdtType,
        jwt: '',
        pdtInfo: false,
        useBalance: true,
        payWay: WAYZFB,
        agreement: true,
        relief: false
      }
    },
    computed: {
      realPrice() {
        let self = this
        return self.useBalance? self.pdtInfo.otherPay : self.pdtInfo.salePrice
      },
      isNoPay() {
        let self = this
        let price = self.useBalance? self.pdtInfo.otherPay : self.pdtInfo.salePrice
        return price <= 0
      },
      isZfb() {
        let self = this
        return self.payWay === WAYZFB
      },
      isWx() {
        let self = this
        return self.payWay === WAYWX
      }
    },
    created() {
      let self = this
      self.isPaying = false
      self.timer = null
      self._initPage()
    },
    mounted() {
      let self = this
      self._calculate()
    },
    methods: {
      getTitle(val) {
        let self = this
        if (pdtType == 'algVip') {
          return val + '天'
        }
        return val
      },
      _goPay() {
        let self = this
        if(self.agreement) {
           if(checkLocalLogin()) {
             if(self.isPaying){
               toast('收银台正在加载中，请稍后...');
               return;
             }
             toast('收银台正在加载中，请稍后...');
             clearTimeout(self.timer);
             self.timer = setTimeout(function(){
               if(self.isPaying){
                 self.isPaying = false;
               }
             },4000);
             self.isPaying = true;
             let realPrice = self.realPrice

             let params = {
               'pdtType': self.pdtType,
               'orderNo': self.pdtInfo.orderLogNo,
               'chargeWay': self.payWay,
               'checkWallet': self.useBalance? 1 : 0,
               'salePrice': self.pdtInfo.salePrice
             }
             sendCharge(params).then((res) => {
               self.isPaying = false
               let result = self.resultHandler(res)
               let {status, data} = result
               let code = status.code
               if (code === ERR_OK) {
                 if(data.chargeWay === "0"){
                   toast.alert_kf({
                     text: '已经支付成功',
                     type: 'success',
                     onClose: function() {
                       goPage(PAGEURLS.ORDER)
                     }
                   });
                   return;
                 }
                 if(self.payWay == WAYZFB){
                   goPage(data.payInfo)
                 } else if(self.payWay == 5){
                   // 微信
                   toast.confirm_wx({
                     text: data.payInfo+'&random=' + Math.ceil(Math.random()*10000000000000000),
                     sureBtnText: '已经支付成功',
                     cancelBtnText: '取消支付',
                     price: realPrice,
                     onConfirm: function() {
                       self._isSucc(data.chargeNo)
                     },
                     onCancel: function() {

                     }
                   });
                 }
               } else if(code === ERR_CODE.STOPPAY){
                 self.alert('推荐已经停止购买');
               } else if(code === ERR_CODE.PAY_ILLEGAL_ORDER){
                 self.alert('非法的订单');
               } else if(code === ERR_CODE.PAY_FIND_ORDER_FAIL){
                 self.alert('查询不到此订单');
               } else if(code === ERR_CODE.PAY_NOT_REPEAT_PAY){
                 self.alert('订单已支付，不能重复支付');
               } else if(code === ERR_CODE.PAY_ORDER_EXPIRED){
                 self.alert('订单已失效');
               } else if(code === ERR_CODE.PAY_FAIL_BACK_DATA_NO_PAY){
                 self.alert('交易失败：余额不足，支付金额已退至余额。');
               } else if(code === ERR_CODE.PAY_ILLEGAL_MATCHID){
                 self.alert('非法的赛事id');
               } else if(code === ERR_CODE.PAY_STOP_MATCH_PURCHASE){
                 self.alert('本场比赛已停止购买');
               } else if(code === ERR_CODE.PAY_HAS_SPURCHASE){
                 self.alert('您已买过了,请勿重复购买');
               } else if(code === ERR_CODE.PAY_PRICE_ILLEGAL){
                 self.alert('价格不正确，请重新刷新页面');
               } else if(code === ERR_CODE.PAY_CREATE_CHARGE_FAIL){
                 self.alert('创建交易失败');
               } else if(code === ERR_CODE.PAY_FAIL || code === ERR_CODE.PAY_FAIL_BACK_DATA || code === ERR_CODE.PAY_FAIL_BACK_DATA_SUCCESS){
                 self.alert('支付失败，请稍候重新尝试');
               } else if(code >= 2000 && code <= 3000){
                 self._toastLogin()
               } else {
                 self.alert('支付失败');
               }
             })
           } else {
             self._toastLogin()
           }
         } else {
           self.alert("请先阅读《新浪智能付费/免费服务使用协议》");
         }
      },
      _isSucc: function(chargeNo){
        var self = this;
        let params = {
          'pdtType': self.pdtType,
          'pdtIds': self.pdtIds,
          'chargeNo': chargeNo
        }
        queryCharge(params).then((res) => {
          let result = self.resultHandler(res)
          let {status} = result
          let code = status.code
          if(code === ERR_OK){
            goPage(PAGEURLS.SUCCESS)
          } else if(code === ERR_CODE.PAY_FIND_ORDER_FAIL){
            toast('查询不到此订单');
          } else if(code === ERR_CODE.PAY_ORDER_NO_PURCHASE){
            toast('订单未支付');
          } else if(code === ERR_CODE.PAY_ORDER_EXPIRED){
            toast('订单已失效');
          } else if(code === ERR_CODE.PAY_FAIL_BACK_DATA_NO_PAY){
            toast('交易失败：余额不足，支付金额已退至余额。');
          } else if(code >= 2000 && code <= 3000){
            self._toastLogin()
          } else {
            toast('查询支付状态失败');
          }
        })
      },
      alert: function(msg){
        toast.alert_kf({
          text: msg,
          type: 'warn',
          onClose: function() {

          }
        });
      },
      _initPage() {
        let self = this
        if(!self.pdtIds || !self.pdtType){
          toast.alert_kf({
            text: '购买信息有误,请重新购买！',
            type: 'warn',
            onClose: function() {
              // history.back();
            }
          });
          return;
        }
        self.jwt = getLocalJWT()
        if(checkLocalLogin() && self.jwt) {
          self._getPdtInfo()
        } else {
          self._toastLogin()
        }
      },
      _getPdtInfo() {
        let self = this
        self.loading = true
        let params = {
           'pdtType': self.pdtType,
           'pdtIds': self.pdtIds
        }
        createOrder(params).then((res) => {
          let result = self.resultHandler(res)
          let {status, data} = result
          let code = status.code
          if (code === ERR_OK) {
            self.noResult = false
            self.pdtInfo = data
          } else {
            self.errorHandler(code, '生成订单失败')
          }
          self.loading = false
        })
      },
      _toastLogin() {
        toast.confirm({
          text: '获取用户信息失败,请重新登录',
          sureBtnText: '重新登录',
          cancelBtnText: '取消',
          type: 'warn',
          onConfirm: function() {
            deleteLocalUserInfo();
            goLoginIsBack(PAGEURLS.LOGIN);
          },
          onCancel: function() {
          }
        })
      },
      _getPrice(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s + ' 炮弹';
      },
      _toggleUseBalance() {
        let self = this
        self.useBalance = !self.useBalance
      },
      _selectZfb() {
        let self = this
        self.payWay = WAYZFB
      },
      _selectWx() {
        let self = this
        self.payWay = WAYWX
      },
      _showRelief() {
        let self = this
        self.relief = true
      },
      _hideRelief() {
        let self = this
        self.relief = false
      },
      _calculate() {
        let self = this
        let vd = util.viewData();
        let height = vd.viewHeight - 135 - 240;

        if (height > 0) {
          let $container = $('#content')
          $container.css({'minHeight': height + 'px'})
        }
      }
    },
    components: {
      MHeader,
      Relief
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  #app
    overflow: hidden
    background-color: $cwhite
    .content
      padding-bottom: 40px
      .gray-placeholder
        height: 30px
        background: $cbg
      .pdt-info
        min-height: 200px
        padding: 54px 0 30px
        .pdt-head
          position: relative
          overflow: hidden
          height: 42px;
          padding-bottom: 20px;
          .pdt-head-icon
            background-color: #c6282f
            margin-right: 18px
            width: 8px
            height: 22px
            float: left
          .pdt-head-text
            font-size: 18px
            line-height: 22px
            float: left
        .pdt-main
          overflow: hidden
          .pdt-table
            overflow: hidden
            font-size: 14px
            border: 1px solid $bgray2
            .thead
              height: 50px
              line-height: 50px
              text-align: center
              border-bottom: 1px solid $bgray2
              font-size: 16px
            .tbody
              height: 70px
              line-height: 70px
              text-align: center
              font-size: 16px
            .td230
              float: left
              padding: 0 10px
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
              width: 230px
            .td170
              float: left
              padding: 0 10px
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
              width: 170px
            .td360
              float: left
              padding: 0 10px
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
              width: 360px
            .td150
              float: left
              padding: 0 10px
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
              width: 150px
            .pdt-price
              color: $red
              font-size: 16px
        .pdt-box
          overflow: hidden
          margin-top: 23px
          border: 1px solid $bgray2
          -moz-user-select: none; /*火狐*/
          -webkit-user-select: none; /*webkit浏览器*/
          -ms-user-select: none; /*IE10*/
          -khtml-user-select: none; /*早期浏览器*/
          user-select: none;
          position: relative
          .pdt-tips
            position: absolute
            right: 60px
            top: 200px
            font-size: 18px
            color: $cgray3
          .pdt-pay-info
            border-bottom: 1px dashed $bgray2
            min-height: 110px;
            padding: 25px 30px 55px 60px
          .pay-meet
            height: 38px
            line-height: 38px
            font-size: 18px
          .pay-left
            float: left
            width: 648px
            text-align: right
            position: relative
          .pay-right
            float: right
            width: 230px
            text-align: left
            padding-left: 20px
          .pay-use
            height: 38px
            line-height: 38px
            font-size: 18px
          .pay-other
            padding-top: 28px;
            height: 70px;
            line-height: 42px;
            font-size: 18px
            .pay-right
              color: #ee3b12
              font-size: 32px
              font-weight: bold
          .pay-sybmol
            color: #a3a5aa
            font-size: 18px
            padding-right: 4px
            font-weight: normal
          .btn-use-balance
            width: 20px
            height: 20px
            position: absolute
            top: 50%
            margin-top: -10px
            right: 120px
            background: url(../../../static/img/sep_radio.png) no-repeat
            cursor: pointer
            &.selected
              background: url(../../../static/img/sep_radio_s.png) no-repeat
        .pay-way
          padding: 36px 58px 0
          position: relative
          height: 80px
          .pay-way-btn
            float: right
            width: 113px
            line-height: 42px
            padding-left: 67px
            height: 44px
            border: 1px solid #ebebeb
            font-size: 18px
            margin-left: 23px
            border-radius: 22px
            &.pay-way-wx
              background: url(../../../static/img/icon_wx.png) no-repeat 20px 7px
            &.pay-way-zfb
              background: url(../../../static/img/icon_zfb.png) no-repeat 20px 7px
            &.selected
              border: 1px solid #ef4a24;
        .pay-way-no
          overflow: hidden
          .pay-way-btn
            background-color: #ebebeb!important
            border: 1px solid #ebebeb!important
            color: #313336
            cursor: default
        .pdt-bottom
          overflow: hidden
          height: 88px
          padding: 12px 53px 0 27px
          .relief-read
            margin-right: 4px
            margin-top: 30px
            cursor: pointer
          .relief
            cursor: pointer
          .btn-go-pay
            cursor: pointer
            float: right
            width: 236px
            cursor: pointer
            height: 65px
            background: url(../../../static/img/btn_pay.png) no-repeat
            &.no
              background: url(../../../static/img/btn_pay_no.png) no-repeat
              cursor: default
</style>
