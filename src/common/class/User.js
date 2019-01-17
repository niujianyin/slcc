/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/23 14:24
 */

import {DEFAULTHEADPORTRAITURL} from 'common/const/config'

export default class User {
  constructor(data) {
    this.aicaiMemberId = data.aicaiMemberId
    this.expiredAt = data.expiredAt
    this.issueAt = data.issueAt
    this.paoMemberId = data.paoMemberId
    this.userPhoneNum = data.userPhoneNum
    this.nickname = data.nickname
    this.img =  data.img || DEFAULTHEADPORTRAITURL
    this.wb_uid = data.wb_uid
  }
}
