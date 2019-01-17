import {getLocalUserInfo, getLocalJWT} from 'common/js/cache'

const state = {
  userInfo: getLocalUserInfo(),
  jwt: getLocalJWT(),
  navIdx: 0,
  member: 0,
  memberDay: '__',
  alertType: 'warning',
  alertShow: false,
  alertText: '',
  vipShow: false,
  loadingFindLaw: false,
  loadingFindLawSx: false,
  loadingFindLawDx: false,
  type: 'all',
  dateRange: '',
  algAttrs: [],
  findLaw: false,
  algHotMatches: [],
}

export default state