import {commonParams, commonPostParams, baseURL as url} from 'common/const/config'
import { get, post, jsonp } from 'api/lib/http'

export function getMemberVipInfo() {
  let data = Object.assign({}, commonParams, {
    cat1: 'getMemberVipInfo'
  })
  return get(url, {
    params: data
  })
}

export function getAlgMatchDate() {
  let data = Object.assign({}, commonParams, {
    cat1: 'getAlgMatchDate'
  })
  return get(url, {
    params: data
  })
}


/**
 *  id '1', //智能因子  '51', //基础因子  '72', //技术因子 '112', //舆论因子
 */
export function getTagsConfig(id) {
  let data = Object.assign({}, commonParams, {
    cat1: 'getTagsConfig',
    rootId: id
  })
  return get(url, {
    params: data
  })
}

export function getHotTagsConfig() {
  let data = Object.assign({}, commonParams, {
    cat1: 'getHotTagsConfig'
  })
  return get(url, {
    params: data
  })
}

export function algHotTags() {
  let data = Object.assign({}, commonParams, {
    cat1: 'algHotTags'
  })
  return get(url, {
    params: data
  })
}


export function findMatchesByTag(params) {
  let data = Object.assign({}, commonParams, {
    cat1: 'findMatchesByTag',
    tagIds: params.tagIds,
    dateBegin: params.dateBegin,
    dateEnd: params.dateEnd,
    leagueTypes: params.leagueTypes,
    gameType: params.gameType
  })
  return get(url, {
    params: data
  })
}

export function relationMatches(params) {
  let data = Object.assign({}, commonParams, {
    cat1: 'relationMatches',
    tagIds: params.tagIds,
    adviceFlag: params.adviceFlag,
  })
  if (params.isBd) {
    data.isBd = params.isBd
  }
  return get(url, {
    params: data
  })
}

export function getAlgVipList(params) {
  let data = Object.assign({}, commonParams, {
    cat1: 'getAlgVipList'
  })
  return get(url, {
    params: data
  })
}

export function getAlgLeagues() {
  let data = Object.assign({}, commonParams, {
    'cat1': 'getAlgLeagues'
  })
  return jsonp(url, data)
}

export function getAlgHotMatches() {
  let data = Object.assign({}, commonParams, {
    'cat1': 'algHotMatches'
  })
  return jsonp(url, data)
}

export function getAlgSearchTeam(keyword) {
  let data = Object.assign({}, commonParams, {
    'cat1': 'algSearchTeam',
    'keyword': keyword
  })
  return jsonp(url, data)
}

export function getMatchByTeamId(tid) {
  let data = Object.assign({}, commonParams, {
    'cat1': 'getMatchByTeamId',
    'team_id': tid
  })
  return jsonp(url, data)
}

export function getAlgMatchBaseInfo(id) {
  let data = Object.assign({}, commonParams, {
    'cat1': 'getAlgMatchBaseInfo',
    'matchId': id
  })
  return jsonp(url, data)
}

