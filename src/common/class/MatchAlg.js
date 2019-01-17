/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/23 17:34
 */

import {isArray} from 'common/js/util'

export default class MatchAlg {
  constructor(data) {
    this.id = data.id
    this.LeagueType = data.LeagueType
    this.Round = data.Round
    this.Team1 = data.Team1
    this.Team2 = data.Team2
    this.Flag1 =  data.Flag1
    this.Flag2 = data.Flag2
    this.Score1 = data.Score1
    this.Score2 = data.Score2
    this.LiveStatus = data.LiveStatus
    this.MatchDate = data.MatchDate
    this.MatchTime = data.MatchTime
    this.IfHot = data.IfHot == 1
    this.LeagueType_cn = data.LeagueType_cn
    this.status = data.status
    this.status_cn = data.status_cn
    this.relation = getRound(data.relation)
    this.tags = data.tags
    this.price = data.price
    this.oldPrice = data.oldPrice
    this.priceBar = getPriceBar(this.price, this.oldPrice)
    this.pdtIds = data.pdtId
    this.pdtType = data.pdtType
    // 1 不可购买, 2 可购买, 3已买, 4已买并且无预测 -1jwt失效
    this.switchFlag = data.switchFlag

    this.datetime = getDateTime(data.MatchDate, data.MatchTime)
    this.vs = getVS(data)
    this.relation_m = getPercent(data.relation)
    this.tagmore = getTagmore(data.tags)
    this.tagslimit = getTagslimit(data.tags)
    this.hasOdds = data.hasOdds
    this.strongOdds = data.strongOdds
    this.weakOdds = data.weakOdds
    this.pinOdds = data.pinOdds
    this.team1Strong = data.team1Strong
    this.team2Strong = data.team2Strong
    this.adviceCN = data.adviceCN
    this.adviceFlag = data.adviceFlag
    this.odds = getOdds(data)
  }
}

function getTagmore(val) {
  if (!val) {
    return false
  }
  return val.length > 1? true: false
}

function getTagslimit(val) {
  if (!val) {
    return []
  }
  return val.length > 1? val.slice(0, 1): val
}

function getDateTime(date, time) {
  return `<span>${date}</span><span class="pl5"></span><span>${time}</span>`
}

function getRound(val) {
  return Math.round(val)
}

function getPercent(val) {
  return Math.round(val) + '%'
}

function getVS(data) {
  let html = ''
  if (data.team1Strong == '1') {
    html = `<span class="icon_rang icon_rang_l"></span><span class="team1">${data.Team1}</span><span class="vs">VS</span><span class="team2">${data.Team2}</span>`
  } else {
    html = `<span class="team1">${data.Team1}</span><span class="vs">VS</span><span class="team2">${data.Team2}</span><span class="icon_rang icon_rang_r"></span>`
  }
  return html
}

function getPriceBar(price, oldPrice) {
  return `<span class="price">${price}炮弹</span><span class="old-price">${oldPrice}炮弹</span>`
}

function getScore(val1, val2) {
  if (!val1) {
    return '- : -'
  }
  return `${val1} : ${val2}`
}

function getAdvDescM(val) {
  return val? val : '-'
}

function getOdds(data) {
  let odds = '暂无'
  if (data.adviceFlag == '1') {
    odds = data.strongOdds-0
  } else if (data.adviceFlag == '2') {
    odds = data.pinOdds-0
  } else if (data.adviceFlag == '3') {
    odds = data.weakOdds-0
  }
  if (odds > 0) {
     odds = '<span class="red">'+odds+'%</span>'
  } else if (odds < 0){
    odds = '<span class="blue">'+odds+'%</span>'
  }

  return odds
}