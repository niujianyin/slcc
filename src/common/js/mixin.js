/**  
 * @Name: mixin.js
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018-03-21 14:48:45
*/

let util = window.util || {}
let cache = window.cache || {}
let $ = window.$

import NoResult from 'base/no-result/no-result'
import {ERR_CODE} from 'common/const/code'
import {ERR_OK, PAGEURLS}  from 'common/const/config'
import {goPage, goLoginIsBack}  from 'common/js/util'
import {loginOut}  from 'api/login'
import {getLocalUserInfo, getLocalJWT, deleteLocalUserInfo}  from 'common/js/cache'
import toast from 'common/js/toast'

export const baseMixin = {
  data() {
    return {
      noResult: false,
      noResultText: ''
    };
  },
  methods: {
    /**
     * @param status
     */
    errorHandler(code, msg) {
      // let exception = new BaseException('', '', 500);
      // throw  exception.toString()
      let self = this

      if (code >= 2000 && code <= 3000) {
        // 登录
        cache.deleteLocalUserInfo()
        util.goLoginIsBack(PAGEURLS.LOGIN)
      } else if(code === ERR_CODE.UNAUTHORIZED){
        toast.confirm({
          text: msg, // '您无权查看此内容，请重新登录'
          sureBtnText: '重新登录',
          cancelBtnText: '取消',
          type: 'warn',
          onConfirm: function() {
            loginOut().then(() => {
              self.setUserInfo(getLocalUserInfo())
              self.setJWT(getLocalJWT())
              cache.deleteLocalUserInfo()
              util.goLoginIsBack(PAGEURLS.LOGIN)
            });
          },
          onCancel: function() {
            self.noResult = true
            self.noResultText = msg
            self.loading = false
          }
        })
        return
      } else if(code === ERR_CODE.STOPPAY){
        self.noResultText = '推荐已经停止购买';
      } else if(code === ERR_CODE.PAY_STOP_MATCH_PURCHASE){
        self.noResultText = '本场比赛已停止购买';
      } else if(code === ERR_CODE.PAY_HAS_SPURCHASE){
        self.noResultText = '您已买过了,请勿重复购买';
      } else if(code === ERR_CODE.PAY_NOT_MATCH_FORECAST_DATA){
        self.noResultText = '暂无本场预测数据';
      } else if(code === ERR_CODE.PAY_CREATE_ORDER_FAIL){
        self.noResultText = '生成订单失败，请重试';
      } else {
        self.noResultText = msg
        console.log( msg, code)
      }
      self.noResult = true
    },
    /**
     * @param res
     * @returns {*}
     */
    resultHandler(res) {
      if (!res.result || !res.result.status) {
        return ''
      }
      return res.result
    }
  },
  components: {
    NoResult
  }
}