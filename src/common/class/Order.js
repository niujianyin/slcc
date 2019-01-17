/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/23 17:34
 */

import {isArray, dateFormatFmt} from 'common/js/util'
import {PAGEURLS} from 'common/const/config'

export default class Order {
  constructor(data) {
    this.order_no = data.order_no
    this.type = data.type
    this.order_name = data.order_name
    this.order_desc = data.order_desc
    this.pdt_id = data.pdt_id
    this.charge_amount = data.charge_amount
    this.create_time = data.create_time
    this.status =  data.status
    this.matchId = data.matchId
    this.status_cn = data.status_cn
    this.sports = data.sports
    this.advSelect = data.advSelect
    this.sports_cn = getSportsCn(data.sports)
    this.order_no_m = getOrderNoM(data.order_no)
    this.advSelect_m = getAdvSelectM(data.advSelect)
    this.create_time_m = getCreateTimeM(data.create_time)
    this.order_desc_m = getOrderDescM(data.order_desc)
    this.link = getLink(data)
  }
}

function getSportsCn(val) {
  let final_sport = ''
  if(val == 'football') {
    final_sport = '足球'
  } else if (val == 'nba') {
    final_sport = '篮球'
  } else {
    final_sport = '专家推荐'
  }
  return final_sport
}

function getAdvSelectM(val) {
  return val? val : '-'
}

function getCreateTimeM(date) {
  return dateFormatFmt(date, "yy-MM-dd hh:mm")
}

function getOrderNoM(val) {
  let str = '' + val
  return str.slice(0, 3) + '...'+ str.slice(-4)
}

function getOrderDescM(val) {
  let str = '' + val
  if (str.length > 10) {
    return str.slice(0, 9) + '...'
  } else {
    return str
  }
}

function getLink(data) {
  let type = data.type
  let status = '' + data.status
  let sports = '' + data.sports
  let link = ''
  if (status === '-2' || status === '-1') {

  } else if (status === '0') {
    if (type === 'dc') {
      link = PAGEURLS.MATCHPAY + '?pdtIds=' + data.pdt_id;
    } else if (type === 'rd' || type === 'leagueTeam') {
      link = PAGEURLS.BAOPAY + '?pdtIds=' + data.pdt_id;
    } else if (type === 'expdoc') {
      link = PAGEURLS.ARTICLEPAY + data.pdt_id;
    }
  } else if (status === '2'){
    if (type === 'dc') {
      if (sports == 'football') {
        link = PAGEURLS.FOOTBALLSJ + '?lc_id=' + data.matchId + '&sports_type=football';
      } else if (sports == 'nba') {
        link = PAGEURLS.NBAMX + '?m_id=' + data.matchId + '&sports_type=nba';
      }
    } else if (type === 'rd' || type === 'leagueTeam') {
      link = PAGEURLS.BAOLIST + '?pdtIds=' + data.pdt_id + '&type=' + data.sports + '&order_no=' + data.order_no + '&order_name=' + data.order_name;
    } else if (type === 'expdoc') {
      link = PAGEURLS.ARTICLE + data.matchId;
    }
  }

  return link
}
