/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/23 17:34
 */

import {isArray} from 'common/js/util'

export default class Match {
  constructor(data) {
    this.livecast_id = data.livecast_id
    this.Discipline = data.Discipline
    this.LeagueType = data.LeagueType
    this.Season = data.Season
    this.Round = data.Round
    this.data_from = data.data_from
    this.Title = data.Title
    this.date =  data.date
    this.time = data.time
    this.status = data.status
    this.Team1Id = data.Team1Id
    this.Team1 = data.Team1
    this.Team2Id = data.Team2Id
    this.Team2 = data.Team2
    this.Flag1 = data.Flag1
    this.Flag2 = data.Flag2
    this.Flag1_small = data.Flag1_small
    this.Flag2_small = data.Flag2_small
    this.Score1 = data.Score1
    this.Score2 = data.Score2
    this.LiveStatusExtra = data.LiveStatusExtra
    this.MatchId = data.MatchId
    this.OptaId = data.OptaId
    this.IfHot = data.IfHot == 1
    this.LiveMode = data.LiveMode
    this.ShortTitle = data.ShortTitle
    this.odds_url = data.odds_url
    this.LeagueType_cn = data.LeagueType_cn
    this.odds_id = data.odds_id
    this.status_cn = data.status_cn
    this._id = data._id
    this.LeagueTitle = data.LeagueTitle
    this.tags = data.tags

    this.price = data.price
    this.oldPrice = data.oldPrice
    this.priceBar = getPriceBar(this.price, this.oldPrice)
    this.pdtIds = data.pdtId
    this.pdtType = data.pdtType
    // 1 不可购买, 2 可购买, 3已买, 4已买并且无预测 -1jwt失效
    this.switchFlag = data.switchFlag

    this.vs = getVS(data)
  }
}

function getVS(data) {
  let html = ''
  if (data.status == 1) {
    html = `<span class="team1">${data.Team1}</span><span class="vs">VS</span><span class="team2">${data.Team2}</span>`
  } else {
    data.Score1 = data.Score1? data.Score1: 0
    data.Score2 = data.Score2? data.Score2: 0
    html = `<span class="team1">${data.Team1}</span><span class="vs">${data.Score1}<em class="plr5">:</em>${data.Score2} </span><span class="team2">${data.Team2}</span>`
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