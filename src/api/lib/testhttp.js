/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/22 10:34
 */
import {commonParams, commonPostParams, baseURL as url} from 'common/const/config'
import {get, post, jsonp} from 'api/http'

export function get(pageSize) {
  const data = Object.assign({}, commonParams, {
    cat1: 'expertDocs',
    gameType: 'all',
    isFree: 'all',
    roleType: 'all',
    leagueType: 'all',
    lastId: '',
    pageSize: pageSize
  })
  return get(url, {params: data})
}
export function post(phone, pwd) {
  let postData = {
    'cat1': 'createJwt',
    'actionType': 'password',
    'phone': phone,
    'zoneCode': '86',
    'pwd': md5(pwd)
  };
  let data = Object.assign({}, commonPostParams, postData)
  return post(url, data)
}
export function jsonp(pageSize) {
  const data = Object.assign({}, commonParams, {
    cat1: 'expertDocs',
    gameType: 'all',
    isFree: 'isFree',
    roleType: 'all',
    leagueType: 'all',
    lastId: '',
    pageSize: pageSize
  })

  return jsonp(url, data)
}


