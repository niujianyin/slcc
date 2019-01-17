/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/21 16:52
 */
import {goLoginIsBack} from 'common/js/util'
import {deleteLocalUserInfo, saveLocalUserInfo, saveLocalJTW} from 'common/js/cache'
import { commonPostParams, baseURL as url, PAGEURLS} from 'common/const/config'
import {post} from 'api/lib/http'
import User from 'common/class/User'
import md5 from 'js-md5'

/**
 * 用户登录
 */
export function loginIn(phone, pwd) {
   return loginByPwd(phone, pwd).then((res) => {
     let {status, data} = res.result;
     if (status.code === 0 && data.jwt) {
       let userInfo = new User(data)
       saveLocalUserInfo(userInfo)
       saveLocalJTW(data.jwt)
       return userInfo
     }
     // window.location.reload()
   })
}

export function loginByPwd(phone, pwd) {
  let postData = {
    'cat1': 'createJwt',
    'actionType': 'password',
    'phone': phone,
    'zoneCode': '86',
    'pwd': md5(pwd)
  };
  let data = Object.assign({}, commonPostParams, postData)
  return post(url, data)
}

/**
 * 用户注册
 */
export function regist(params) {
  return post('', params)
}

/**
 * 发送注册验证码
 */
export function registVerifiCode(tellphone) {
  return post('', {tellphone: tellphone})
}

/**
 * 用户登出
 */
export function loginOut() {
  deleteLocalUserInfo()
  return Promise.resolve()
  // goLoginIsBack(PAGEURLS.LOGIN)
}