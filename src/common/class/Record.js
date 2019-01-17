/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/23 17:34
 */

import {isArray, dateFormatFmt} from 'common/js/util'
import {PAGEURLS} from 'common/const/config'

export default class Record {
  constructor(data) {
    this.charge_no = data.charge_no
    this.type = data.type
    this.third_amount = data.third_amount
    this.pdt_id = data.pdt_id
    this.request_time = data.request_time
    this.charge_way = data.charge_way
    this.title =  data.title
    this.detail = data.detail
    this.chargeWay = data.chargeWay
    this.pdtDesc = data.pdtDesc

    this.request_time_m = getRequestTimeM(data.request_time)
    this.third_amount_m = getThirdAmountM(data.third_amount)
  }
}

function getRequestTimeM(date) {
  return dateFormatFmt(date, "yy-MM-dd hh:mm")
}

function getThirdAmountM(val) {
  if(!val) {
    return '-'
  }
  return '￥'+val
}