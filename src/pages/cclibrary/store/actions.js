import * as types from './mutation-types'

export const toastAlert = function({commit}, {alertType, alertShow, alertText}) {
  console.log('actions:',alertType, alertShow,alertText)
  commit(types.SET_ALERT_TYPE, alertType)
  commit(types.SET_ALERT_SHOW, alertShow)
  commit(types.SET_ALERT_TEXT, alertText)
}