/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/23 17:34
 */

import {isArray} from 'common/js/util'

export default class Trial {
  constructor(data) {
    this.id = data.id
    this.LeagueType = data.LeagueType
    this.Round = data.Round
    this.Team1 = data.Team1
    this.Team2 = data.Team2
    this.Flag1 = data.Flag1
    this.Flag2 = data.Flag2
    this.Score1 = data.Score1
    this.Score2 = data.Score2
    this.LiveStatus = data.LiveStatus
    this.MatchDate = data.MatchDate
    this.MatchTime = data.MatchTime
    this.IfHot = data.IfHot
    this.LeagueType_cn = data.LeagueType_cn
    this.status = data.status
    this.status_cn = data.status_cn
    this.team1Strong = data.team1Strong
    this.team2Strong = data.team2Strong
    this.panRoute = data.panRoute
    this.strongOdds = data.strongOdds
    this.weakOdds = data.weakOdds
    this.panRouteCN = data.panRouteCN
    this.pinOdds = data.pinOdds
    this.o3_cn = data.o3_cn

    this.adviceCN = data.adviceCN
    this.adviceFlag = data.adviceFlag

    this.tags = data.tags

    this.datetime_m = getDatetimeM(data.MatchDate, data.MatchTime)
    this.vs = getVS(data)
    this.score_m = getScore(data.Score1, data.Score2)

    this.odds_m = getOddsM(data)
  }
}

function getOddsM(data) {
  let odds = 0
  if (data.adviceFlag == 1) {
    odds = data.strongOdds
  } else if (data.adviceFlag == 2) {
    odds = data.pinOdds
  } else if (data.adviceFlag == 3) {
    odds = data.weakOdds
  } else {
    return '暂无'
  }
  if (odds > 0 ) {
    odds = `<em class="red">${odds}%</em>`
  } else if (odds < 0 ) {
    odds = `<em class="blue">${odds}%</em>`
  } else {
    odds = `${odds}%`
  }
  return odds
}
function getPercent(val) {
  return val + '%'
}
function getDatetimeM(date, time) {
  return `${date}  ${time}`
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

function getScore(val1, val2) {
  if (!val1) {
    return '- : -'
  }
  return `${val1} : ${val2}`
}

function getAdvDescM(val) {
  return val? val : '-'
}