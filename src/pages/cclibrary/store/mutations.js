import * as types from './mutation-types'

const matutaions = {
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_JWT](state, jwt) {
    state.jwt = jwt
  },
  [types.SET_NAV_IDX](state, idx) {
    state.navIdx = idx
  },
  [types.SET_MEMBER](state, member) {
    state.member = member
  },
  [types.SET_MEMBER_DAY](state, memberDay) {
    state.memberDay = memberDay
  },
  [types.SET_ALERT_TYPE](state, alertType) {
    state.alertType = alertType
  },
  [types.SET_ALERT_SHOW](state, alertShow) {
    state.alertShow = alertShow
  },
  [types.SET_ALERT_TEXT](state, alertText) {
    state.alertText = alertText
  },
  [types.SET_VIP_SHOW](state, vipShow) {
    state.vipShow = vipShow
  },
  [types.SET_LOADING_FIND_LAW](state, loadingFindLaw) {
    state.loadingFindLaw = loadingFindLaw
  },
  [types.SET_LOADING_FIND_LAW_SX](state, loadingFindLawSx) {
    state.loadingFindLawSx = loadingFindLawSx
  },
  [types.SET_LOADING_FIND_LAW_DX](state, loadingFindLawDx) {
    state.loadingFindLawDx = loadingFindLawDx
  },
  [types.SET_TYPE](state, type) {
    state.type = type
  },
  [types.SET_DATE_RANGE](state, dateRange) {
    state.dateRange = dateRange
  },
  [types.SET_ALG_ATTRS](state, algAttrs) {
    state.algAttrs = algAttrs
  },
  [types.SET_FIND_LAW](state, findLaw) {
    state.findLaw = findLaw
  },
  [types.SET_ALG_HOT_MATCHES](state, algHotMatches) {
    state.algHotMatches = algHotMatches
  }
}

export default matutaions