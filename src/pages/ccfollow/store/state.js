import {getLocalUserInfo, getLocalJWT} from 'common/js/cache'

const state = {
  userInfo: getLocalUserInfo(),
  jwt: getLocalJWT(),
  navIdx: 0
}

export default state