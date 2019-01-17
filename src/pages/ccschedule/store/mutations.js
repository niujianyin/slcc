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
  }
}

export default matutaions