/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/23 13:41
 */
import {env}  from 'common/const/config'
import localforage from 'localforage'
console.log('localforage is: ', localforage);
localforage.config({
  name : 'xiaopao'
});

export const DOMAIN = '.lottery.sina.com.cn'
export const SINADOMAIN = '.sina.com.cn'
export const CTUSERINFO_KEY = 'ctuserinfo'
export const JWT_KEY = 'qazwsx'
export const CT_LOGIN_BACK_URL_KEY = '__ct_login_back_url__'

export const cookie = (function (doc, win) {
  return {
    getItem: function (key) {
      var cookieKey = key + '=';
      var result = '';
      if (doc.cookie.length > 0) {
        var index = doc.cookie.indexOf(cookieKey);
        if (index != -1) {
          index += cookieKey.length;
          var lastIndex = doc.cookie.indexOf(';', index);
          if (lastIndex == -1) {
            lastIndex = doc.cookie.length;
          }
          result = win.decodeURIComponent(doc.cookie.substring(index, lastIndex));
        }
      }
      return result;
    },
    setItem: function (name, value, domain, expires) {
      domain = domain || DOMAIN || document.domain;
      if (typeof (expires) == 'undefiend' || expires == null || expires == '') {
        // 默认30天过期时间
        var expTimes = 30 * 24 * 60 * 60 * 1000;
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + expTimes);
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expDate.toGMTString() + "; path=" + "/" + "; domain=" + domain;
      } else {
        var expTimes = expires * 1000;
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + expTimes);
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expDate.toGMTString() + "; path=" + "/" + "; domain=" + domain;
      }
    },
    removeItem: function (key) {
      // alert(key);
      // var time = new Date();
      // time.setDate(time.getDate() - 1);
      // doc.cookie = key + '=0; expires=' + time.toGMTString();
      var cval = cookie.getItem(key);
      if (cval) {
        cookie.setItem(key, "0", DOMAIN);
      }
    },
    removeSinaItem: function (key) {
      var cval = cookie.getItem(key);
      if (cval) {
        cookie.setItem(key, "0", SINADOMAIN);
      }
    }
  };
})(document, window);

export const storage = (function (doc, win) {
  var localStorage = window.localStorage;
  // 优先使用localStorage
  if (localStorage) {
    return {
      getItem: function (key) {
        return localStorage.getItem(key);
      },
      setItem: function (key, value) {
        // 在一些设备下, setItem之前必须调用removeItem
        localStorage.removeItem(key);
        localStorage.setItem(key, value);
      },
      removeItem: function (key) {
        localStorage.removeItem(key);
      }
    };
  } else {
    return {
      getItem: cookie.getItem,
      setItem: cookie.setItem,
      removeItem: cookie.removeItem
    };
  }
})(document, window);
/**
 * 验证用户登录
 */
export function checkLocalLogin() {
  var qazwsx = cookie.getItem(JWT_KEY);
  if (qazwsx && qazwsx != '0' && qazwsx.length > 20) {
    return true;
  } else {
    return false;
  }
}

/**
 * 获取JWT
 */
export function getLocalJWT() {
  var qazwsx = cookie.getItem(JWT_KEY);
  if (qazwsx && qazwsx != '0' && qazwsx.length > 20) {
    return qazwsx;
  } else {
    return false;
  }
}

/**
 * 保存用户信息
 */
export function saveLocalUserInfo(data){
  cookie.setItem(CTUSERINFO_KEY, JSON.stringify(data), DOMAIN);
}
/**
 * 保存用户JWT
 */
export function saveLocalJTW(jwt){
  cookie.setItem(JWT_KEY, jwt, DOMAIN);
}

/**
 * 获取用户信息
 */
export function getLocalUserInfo() {
  var ctuserinfo = cookie.getItem(CTUSERINFO_KEY);
  if (ctuserinfo) {
    var obj = JSON.parse(ctuserinfo);
    return obj;
  } else {
    return false;
  }
}

/**
 * 用户登出
 */
export function deleteLocalUserInfo() {
  cookie.removeItem(JWT_KEY);
  cookie.removeItem(CTUSERINFO_KEY);
  cookie.removeSinaItem('SUBP');
}

/**
 * 去登录存当前页面
 */
export function saveCtLoginBackUrl(){
  let curl = location.href;
  storage.setItem(CT_LOGIN_BACK_URL_KEY, curl);
}



window.cache = {
  checkLocalLogin,
  getLocalJWT,
  getLocalUserInfo,
  deleteLocalUserInfo,
  saveCtLoginBackUrl,
  cookie,
  storage,
  localforage
}

