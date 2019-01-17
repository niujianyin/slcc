/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/23 17:34
 */

import {isArray} from 'common/js/util'

export default class MatchHot {
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
    this.IfHot = data.IfHot === '1'
    this.LeagueType_cn = data.LeagueType_cn
    this.status = data.status
    this.status_cn = data.status_cn
    this.stars = data.stars
    this.value = data.value

    this.datetime = getDateTime(data.MatchDate, data.MatchTime)
    this.score = getScore(data)
    this.statusM = getStatusM(data)
    this.starsM = getStarsM(data.stars)
  }
}

function getDateTime(date, time) {
  return `<span>${date}</span><span class="pl5"></span><span>${time}</span>`
}

function getScore(data) {
  let html = ''
  if (data.Score1 === '0' || data.Score1) {
    html = `${data.Score1} <span class="score-line">-</span> ${data.Score2}`
  } else {
    html = `<span class="score-line">-</span><span class="score-line">-</span><span class="score-line">-</span>`
  }
  return html
}

function getStatusM(data) {
  let html = ''
  if (data.status == '1') {
    html = `<div class="team-status team-status1">未开赛</div>`
  } else if (data.status == '2') {
    html = `<div class="team-status team-status2">进行中</div>`
  } else if (data.status == '3') {
    html = `<div class="team-status team-status3">已完赛</div>`
  }
  return html
}

function getStarsM(stars) {
  let html = '<span class="star-text">市场热度：</span>'
  for (let i=0,len=5; i<len; i++) {
    if (i<stars) {
      html += '<span class="star-s">&nbsp;</span>'
    } else {
      html += '<span class="star">&nbsp;</span>'
    }
  }
  return html
}

