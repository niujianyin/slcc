import {commonParams, commonPostParams, baseURL as url} from 'common/const/config'
import { get, post, jsonp } from 'api/lib/http'

export function getCurPrice(params) {
  let data = Object.assign({}, commonParams, {
    cat1: 'payIndex',
    actionType: 'curPrice',
    pdtType: params.pdtType,
    pdtIds: params.pdtIds
  })
  return jsonp(url, data, 'curPrice')
}

export function createOrder(params) {
  let postData = {
    'cat1': 'payIndex',
    'actionType': 'order',
    'pdtType': params.pdtType,
    'pdtIds': params.pdtIds,
    'fromChnl': ''
  };

  let data = Object.assign({}, commonPostParams, postData)
  return post(url, data)
}

export function sendCharge(params) {
  let postData = {
    'cat1': 'payIndex',
    'actionType': 'charge',
    'pdtType': params.pdtType,
    'orderNo': params.orderNo,
    'chargeWay': params.chargeWay,
    'checkWallet': params.checkWallet,
    'salePrice': params.salePrice,
    'fromChnl': ''
  };

  let data = Object.assign({}, commonPostParams, postData)
  return post(url, data)
}

export function queryCharge(params) {
  let data = Object.assign({}, commonParams, {
    'cat1': 'payIndex',
    'actionType': 'isSucc',
    'pdtType': params.pdtType,
    'pdtIds': params.pdtIds,
    'chargeNo': params.chargeNo
  })

  return jsonp(url, data)
}

export function queryChargeSucc(params) {
  let data = Object.assign({}, commonParams, {
    'cat1': 'payIndex',
    'actionType': 'isSucc',
    'pdtType': params.pdtType,
    'pdtIds': params.pdtIds
  })

  return jsonp(url, data)
}

