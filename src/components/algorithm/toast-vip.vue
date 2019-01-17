<template>
  <div class="vip-toast-box" v-if="vipShow">
    <div class="vip-mask"></div>
    <div class="vip-toast">
      <div class="vip-close" @click="vipClose"></div>
      <div class="vip-list">
        <div class="vip-item clearfix" :class="[index==vipItemSelectIdx? 'selected': '', index==0? 'vip-i3': '', isHasOpenedvip3?'vip-i3-gray':'' ]" v-for="(item, index) in vipList" :key="index" @click="vipIS(index)">
          <div class="vip-item-date"><em class="vip-item-day">{{item.pdt_name}}</em>天</div>
          <div class="vip-item-price"><em class="vip-item-amount">{{getInteger(item.amount)}}</em>炮弹</div>
        </div>
      </div>
      <div class="vip-pay-info">
        应付金额：<em class="vip-pay-price">{{vipPrice}}</em> 炮弹
      </div>
      <div class="vip-btn-ok" @click="vipPayment"></div>
      <div class="vip-btn-cancel" @click="vipClose">取消订单</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import { getAlgVipList } from 'api/algorithm'
  import {ERR_OK} from 'common/const/config'
  import Payment from 'class/Payment'
  import {checkLocalLogin} from 'common/js/cache'
  import {loginToast} from 'common/class/Payment'
  import {baseMixin} from 'common/js/mixin'

  export default {
    mixins: [baseMixin],
    data() {
      return {
        loading_algviplist: false,
        vipList: [],
        vipItemSelectIdx: 0,
        isHasOpenedvip3: false,
      };
    },
    computed: {
      isMember() {
        // 0 新用户，1试用 2 试用结束 3 会员 4到期
        let self = this
        return self.member === '3'
      },
      trialMember() {
        let self = this
        return self.member === '1'
      },
      unMember() {
        let self = this
        return self.member === '0'
      },
      unMemberHasTrial() {
        let self = this
        return self.member === '2'
      },
      unMemberHasMember() {
        let self = this
        return self.member === '4'
      },
      vipItemSelect() {
        let self = this
        if (!self.vipList || !self.vipList.length) {
          return ''
        }
        return self.vipList[self.vipItemSelectIdx]
      },
      vipPrice() {
        let self = this
        if (!self.vipItemSelect || self.vipItemSelect.amount === undefined) {
          return '--'
        }
        let price = self.vipItemSelect.amount - 0
        return price
      },
      ...mapGetters([
        'vipShow',
        'member',  // 0 新用户，1试用 2 试用结束 3 会员 4到期
      ])
    },
    created() {
    },
    mounted() {
      let self = this
    },
    methods: {
      openMember() {
        let self = this
        console.log('toast-vip open member')
        if (!checkLocalLogin()) {
          loginToast()
          return
        }
        if (self.loading_algviplist) {
          return
        }
        self.loading_algviplist = true
        let params = {}
        getAlgVipList(params).then((res) => {
          self.loading_algviplist = false
          let result = self.resultHandler(res)

          let {status, data} = result
          let code = status.code
          if (code === ERR_OK) {
            console.log('vipList', data)
            self.vipList = data
            self.isHasOpenedvip3 = self.vipList[0].has_opened
            if (self.isHasOpenedvip3) {
              self.vipItemSelectIdx = 1
            } else {
              self.vipItemSelectIdx = 0
            }
          } else {
            self.$message({
              showClose: true,
              message: '获取会员信息失败，请重试',
              type: 'warning'
            })
          }
        }, (error) => {
          self.loading_algviplist = false
          self.$message({
            showClose: true,
            message: '获取会员信息失败，请重试',
            type: 'warning'
          })
        })


        if (self.unMember) {
          _hmt.push(['_trackEvent', '/algorithm/openmember', 'click', '免费体验']);
        } else if (self.trialMember || self.unMemberHasTrial) {
          _hmt.push(['_trackEvent', '/algorithm/openmember', 'click', '开通会员']);
        } else if (self.isMember || self.unMemberHasMember) {
          _hmt.push(['_trackEvent', '/algorithm/openmember', 'click', '会员续费']);
        }

      },
      vipClose() {
        let self = this
        self.setVipShow(false)
      },
      vipPayment() {
        let self = this
        console.log('vipItemSelect:', self.vipItemSelect)
        self.setVipShow(false)
        let pdtIds = self.vipItemSelect.pdt_id
        let pdtType = self.vipItemSelect.pdt_type
        let data = {
          pdtIds: pdtIds,
          pdtType: pdtType,
          matchId: ''
        }
        let payment = new Payment(data)
        payment.pay()
      },
      vipIS(idx) {
        let self = this
        if (self.isHasOpenedvip3 && idx == 0) {
          return
        }

        self.vipItemSelectIdx = idx
      },
      getInteger(val) {
        return val-0
      },
      ...mapMutations({
        setVipShow: 'SET_VIP_SHOW'
      })
    },
    watch: {
      vipShow(newVal, oldVal) {
        let self = this
        if (newVal !== oldVal && newVal) {
          self.openMember()
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .vip-mask
    position: absolute
    position: fixed
    left: 0px
    right: 0px
    top: 0px
    bottom: 0px
    background: rgba(0, 0, 0, 0.3)
    z-index: 1000
  .vip-toast
    position: absolute
    position: fixed
    left: 50%
    top: 50%
    width: 600px
    height: 493px
    margin: -246px 0 0 -300px
    background: url(../../../static/img/v3_vip_bg.png) no-repeat center center
    z-index: 1000
  .vip-close
    background: url(../../../static/img/match_close.png) no-repeat center top
    width: 25px
    height: 25px
    position: absolute
    top: 22px
    right: 22px
    cursor: pointer
    &:hover
      background: url(../../../static/img/match_close_h.png) no-repeat center top
      width: 29px
      height: 29px
      top: 20px
      right: 20px
      cursor: pointer
  .vip-pay-info
    position: absolute
    left: 20px
    bottom: 22px
    height: 40px
    line-height: 40px
    color: #333333
    font-size: 18px
    .vip-pay-price
      font-size: 28px
      font-weight: bold
      color: #F81E1E
      padding: 0 5px
  .vip-btn-ok
    position: absolute
    background: url(../../../static/img/vip_btn_ok.png) no-repeat center center
    width: 142px
    height: 58px
    bottom: 10px
    right: 19px
    font-size: 0px
    cursor: pointer
  .vip-btn-cancel
    position: absolute
    bottom: 12px
    right: 175px
    height: 58px
    line-height: 58px
    font-size: 18px
    color: #8D9BA0
    cursor: pointer
  .vip-list
    position: absolute
    top: 282px
    left: 6px
    right: 0px
    .vip-item
      overflow: hidden
      float: left
      width: 108px
      height: 98px
      margin-left: 8px
      background: url(../../../static/img/vip_i.png) no-repeat center center
      cursor: pointer
      color: #373737
      .vip-item-date
        overflow: hidden
        padding: 14px 0px 0 10px
        height: 33px
        line-height: 33px
        font-size: 14px
        .vip-item-day
          font-size: 22px
          font-weight: bold
          padding-right: 2px
      .vip-item-price
        padding: 0px 0px 0 10px
        height: 36px
        line-height: 36px
        font-size: 14px
        overflow: hidden
        white-space: nowrap
        .vip-item-amount
          font-size: 24px
          color: #F81E1E
          font-weight: bold
          padding-right: 2px
    .vip-item.selected,.vip-item:hover
      background: url(../../../static/img/vip_is.png) no-repeat center center
      color: #fff
      .vip-item-date
        color: #fff
        .vip-item-day
          color: #fff
      .vip-item-price
        color: #fff
        .vip-item-amount
          color: #fff
    .vip-item.vip-i3
      background: url(../../../static/img/vip_i3.png) no-repeat center center
      .vip-item-date
        padding: 29px 0px 0 0px
        height: 33px
        line-height: 33px
        font-size: 14px
        text-align: center
        .vip-item-day
          font-size: 22px
          font-weight: bold
          padding-right: 2px
      .vip-item-price
        display: none
        .vip-item-amount
          overflow: hidden
    .vip-item.vip-i3.selected,.vip-item.vip-i3:hover
      background: url(../../../static/img/vip_is3.png) no-repeat center center
      color: #fff
    .vip-item.vip-i3.vip-i3-gray,.vip-item.vip-i3.vip-i3-gray:hover
      background: url(../../../static/img/vip_i3_gray.png) no-repeat center center
      .vip-item-date
        color: #D8D8D8
        .vip-item-day
          color: #D8D8D8
</style>