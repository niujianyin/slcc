import {getLocalUserInfo, getLocalJWT} from 'common/js/cache'
import {getAsideState} from 'common/js/util'

//当浏览器宽度超过1440时，左侧导航菜单默认打开，反之隐藏

const state = {
  userInfo: getLocalUserInfo(),
  jwt: getLocalJWT(),
  navIdx: 0,
  showAside: getAsideState(),
}

export default state