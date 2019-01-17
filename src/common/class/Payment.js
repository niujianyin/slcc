/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/23 14:24
 */

import {PAGEURLS, ERR_OK}  from 'common/const/config'
import {ERR_CODE}  from 'common/const/code'
import {openPage, goPage, goLoginIsBack}  from 'common/js/util'
import {checkLocalLogin, getLocalJWT, deleteLocalUserInfo}  from 'common/js/cache'
import {queryChargeSucc, getCurPrice}  from 'api/aiPay'
import toast from 'common/js/toast'
import Vue from 'vue'
import {Message} from 'element-ui'

export default class Payment {
  constructor(data) {
    this.pdtIds = data.pdtIds,
    this.pdtType = data.pdtType,
    this.matchId = data.matchId
  }

  pay() {
    step1(this.pdtIds, this.pdtType, this.matchId)
  }
}

let loading_price = false
export function step1(pdtIds, pdtType, matchId) {
  if( checkLocalLogin() ) {
    if (loading_price) {
      return
    }
    loading_price = true
    let params = {
      pdtType: pdtType,
      pdtIds: pdtIds,
    }
    getCurPrice(params).then((res) => {
      loading_price = false

      if (!res.result || !res.result.status) {
        return
      }
      let result = res.result
      let {status, data, source_price} = result
      let code = status.code
      if (code === ERR_OK) {
        /**
         * source_price	原价
         * price	享受活动价格，不享受vip折扣价格（支付时体现vip折扣价格）不再使用
         * sale_price	最终价格，享受活动价格和vip折扣价格
         * */
        let price = data.sale_price
        let oldPrice = source_price
        toast.confirm_pao({
          text: '您的订单已提交，请尽快付款！',
          sureBtnText: '立即支付',
          cancelBtnText: '取消订单',
          price: price,
          oldPrice: oldPrice,
          onConfirm: function() {
            step2(pdtIds, pdtType, price, oldPrice, matchId)
          },
          onCancel: function() {

          }
        });
      } else {
        Message({
          showClose: true,
          message: status.msg,
          type: 'warning'
        });
      }
    }, (error) => {
      loading_price = false
    })
  } else {
    loginToast()
  }
}

export function step2(pdtIds, pdtType, price, oldPrice, matchId) {
  if( checkLocalLogin() ) {
    openPage(PAGEURLS.AIPAY+pdtIds+'&pdtType='+pdtType,'_blank');
    toast.confirm_pao({
      text: '请在新开的页面完成支付操作！',
      sureBtnText: '我已支付成功',
      cancelBtnText: '没有完成支付',
      price: price,
      oldPrice: oldPrice,
      onConfirm: function() {
        step3(pdtIds, pdtType, matchId)
      },
      onCancel: function() {
        goPage(PAGEURLS.ORDER);
      }
    })
  } else {
    loginToast()
  }
}

export function step3(pdtIds, pdtType, matchId) {
  var self = this;
  let params = {
    pdtType: pdtType,
    pdtIds: pdtIds
  }
  queryChargeSucc(params).then((res) => {
    if (!res.result || !res.result.status) {
      return
    }
    let result = res.result
    let {status} = result
    let code = status.code
    if(code === ERR_OK){
      if (pdtType == 'algDc') {
        goPage(PAGEURLS.PERSPECTIVE + matchId)
      } else if (pdtType == 'algVip'){
        goPage(PAGEURLS.ALGORITHM)
      }
    } else if(code === ERR_CODE.PAY_FIND_ORDER_FAIL){
      toast('查询不到此订单');
    } else if(code === ERR_CODE.PAY_ORDER_NO_PURCHASE){
      toast('订单未支付');
    } else if(code === ERR_CODE.PAY_ORDER_EXPIRED){
      toast('订单已失效');
    } else if(code === ERR_CODE.PAY_FAIL_BACK_DATA_NO_PAY){
      toast('交易失败：余额不足，支付金额已退至余额。');
    } else if(code >= 2000 && code <= 3000){
      loginToast()
    } else {
      toast(status.msg);
    }
  })
}


export function loginToast(url){
  toast.confirm_login({
    text: '请先登录账号',
    sureBtnText: '登录',
    cancelBtnText: '取消',
    onConfirm: function() {
      if(url){
        goPage(PAGEURLS.LOGIN+'?gopage='+url);
      } else {
        deleteLocalUserInfo()
        goLoginIsBack(PAGEURLS.LOGIN);
      }
    },
    onCancel: function() {

    }
  });
}

export function goLoginByUrl(url){
  if(url){
    goPage(PAGEURLS.LOGIN+'?gopage='+url);
  } else {
    deleteLocalUserInfo()
    goLoginIsBack(PAGEURLS.LOGIN);
  }
}