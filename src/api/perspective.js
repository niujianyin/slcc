import {commonParams, commonPostParams, baseURL as url} from 'common/const/config'
import { get, post, jsonp } from 'api/lib/http'

export function getMatchInfo(id) {
  let data = Object.assign({}, commonParams, {
    id: id
  })
  let url = '//match.lottery.sina.com.cn/football/livecast/getMatches';
  return get(url, {params: data})
}

export function algCheckCanBuy(id) {
  let data = Object.assign({}, commonParams, {
    cat1: 'algCheckCanBuy',
    matchId: id
  })
  return get(url, {params: data})
}

export function getTextByMatchId(id) {
  let data = Object.assign({}, commonParams, {
    cat1: 'getTextByMatchId',
    matchId: id
  })
  return get(url, {params: data})
}

export function getTagByMatchId(id) {
  let data = Object.assign({}, commonParams, {
    cat1: 'getTagByMatchId',
    matchId: id
  })
  return get(url, {params: data})
}

export function getPopularOptions(id) {
  let data = Object.assign({}, commonParams, {
    cat1: 'getPopularOptions',
    matchId: id
  })
  return get(url, {params: data})
}

export function getTeamStatus(id) {
  let data = Object.assign({}, commonParams, {
    cat1: 'getTeamStatus',
    matchId: id
  })
  return get(url, {params: data})
}


export function getTechnical(id, oddsId) {
  let data = Object.assign({}, commonParams, {
    cat1: 'getTechnical',
    matchId: id,
    oddsId: oddsId
  })
  return get(url, {params: data})
}