import {commonParams, commonPostParams, baseURL as url} from 'common/const/config'
import { get, post, jsonp } from 'api/lib/http'


export function getVisitor() {
  let data = Object.assign({}, commonParams, {
    cat1: 'fluoroscopyCount'
  })
  let url = '//match.lottery.sina.com.cn/client/index/clientProxy';
  return jsonp(url, data, 'fluoroscopyCount')
}

export function getTabList() {
  let data = Object.assign({}, commonParams, {})
  let url = '//interface.sina.cn/sports/caitong/app/get_alg_football_league.d.json';
  return jsonp(url, data, 'get_alg_football_league')
}

export function getCalNoMatchDates(year, month) {
  let data = Object.assign({}, commonParams, {
    year: parseInt(year),
    mon: parseInt(month)
  })
  let url = '//match.lottery.sina.com.cn/football/index/calNoMatchDates';
  return jsonp(url, data)
}

export function getMatchByTag(params) {
  let data = Object.assign({}, commonParams, {
    cat1: 'getMatchByTag',
    date: params.date,
    type: params.type,
    page: params.page,
    dpc: 1
  })
  let url = '//match.lottery.sina.com.cn/client/index/clientProxy';
  return jsonp(url, data)
}

export function getMatchType(params) {
  let data = Object.assign({}, commonParams, {
    date: params.date
  })
  let url = '//match.lottery.sina.com.cn/football/index/typeMatchesNum';
  return jsonp(url, data)
}