/**  
 * @Name: util.js
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018-03-21 18:20:03
*/
import {env}  from 'common/const/config'
import {saveCtLoginBackUrl}  from 'common/js/cache'
import md5 from 'js-md5';

function goPage(url){
  window.location.href = url;
}

function openPage(url){
  url && window.open(url,'_blank');
}

function getGoPage(){
  let purl = ''
  let cur_url = window.location.href;
  let pindex = cur_url.indexOf('gopage=');
  if(pindex > -1){
    purl = cur_url.slice(pindex+7);
  }
  return purl
}


function goLoginIsBack(url){
  if (!url) {
    url = window.__config.PAGEURLS.LOGIN
  }
  var curl = location.href;

  if (curl.indexOf('http://lotto.sina.cn/ai/login.d.html') === 0 || curl.indexOf('https://lotto.sina.cn/ai/login.d.html') === 0 ) {
    return
  }

  var idx = curl.indexOf('?gopage=');
  if (idx > 0) {
    curl = curl.slice(0, idx)
  }

  if (url.indexOf('?') === -1) {
    url += '?gopage='+curl;
  } else {
    url += '&gopage='+curl;
  }
  saveCtLoginBackUrl();
  goReplace(url);
}
function goReplace(url){
  window.location.replace(url);
}

function urlAddParams(url){
  let apurl = url
  if (url.indexOf('?') === -1) {
    apurl += '?';
  } else {
    apurl += '&';
  }
  return apurl
}


/**
 * 将 Date 转化为指定格式的String
 * @param date Object
 * @param fmt String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * date = date.replace(/-/g,"/"); util.dateFormatFmt(new Date(date),"MM月dd日")
 * util.dateFormatFmt( new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * util.dateFormatFmt( new Date(), "yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
function dateFormatFmt(date, fmt) {
  if (!date) return ''
  if (isString(date)) {
    date = date.replace(/-/g, '/');
  }
  date = new Date(date);
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
/**
 * 格式化时间
 * @param {String} str
 * @returns {String} 格式化后的时间
 */
function formatDate(date) {
  if (!date) return ''
  if (isString(date)) {
    date = date.replace(/-/g, '/');
  }
  date = new Date(date)
  let time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
}


function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

// toFixed修正：保留数字，位数，是否不补0
function toFixed(num, s, nopad) {
  num = num - 0;
  var times = Math.pow(10, s)
  var des = num * times + 0.5
  des = parseInt(des, 10) / times
  if (!nopad) {
    des = des.toFixed(s);
  }
  return des + ''
}

function viewData() {
  var e = 0,
    l = 0,
    i = 0,
    g = 0,
    f = 0,
    m = 0;
  var j = window,
    h = document,
    k = h.documentElement;
  e = k.clientWidth || h.body.clientWidth || 0;
  l = j.innerHeight || k.clientHeight || h.body.clientHeight || 0;
  g = h.body.scrollTop || k.scrollTop || j.pageYOffset || 0;
  i = h.body.scrollLeft || k.scrollLeft || j.pageXOffset || 0;
  f = Math.max(h.body.scrollWidth, k.scrollWidth || 0);
  m = Math.max(h.body.scrollHeight, k.scrollHeight || 0, l);
  return {
    scrollTop: g,
    scrollLeft: i,
    documentWidth: f,
    documentHeight: m,
    viewWidth: e,
    viewHeight: l
  };
};

function paramMd5(data) {
  if(!data) {
    return;
  }
  var keyArr = [],
    valArr = [];
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      keyArr.push(key);
    }
  }
  keyArr.sort();
  for (var i = 0, len = keyArr.length; i < len; i++) {
    valArr.push(data[keyArr[i]]);
  }
  var sign = md5(valArr.join('|'));
  data.sign = sign;
  console.log('params:' +JSON.stringify(data));
  return data;
}

// 金钱格式换为1,000
function thirdFormat(str) {
  str = str + "";
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function eachObj(obj, callback) {//遍历对象
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      if (callback.call(obj[k], obj[k], k) === false) {
        break;
      }
    }
  }
}

function isString(s) {
  return Object.prototype.toString.call(s) === '[object String]';
}

function isArray(o) {
  return Object.prototype.toString.call(o)==='[object Array]';
}
function isObject(o) {
  return Object.prototype.toString.call(o)==='[object Object]';
}

let scrollEnd = (function() {
  var timeout = null;
  var _onScrollEnd = null;
  function _onScroll() {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
      _onScrollEnd && _onScrollEnd();
    }, 50);
  }

  return function(onScrollEnd, enable) {
    _onScrollEnd = onScrollEnd;
    if (enable) {
      $(window).unbind("scroll");
      $(window).scroll(function(event) {
        _onScroll();
      });
    } else {
      $(window).unbind("scroll");
    }
  };
})();

function toDecimal2(x){
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x*100)/100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}

function addPreZero(num, s){
  var ss = -s;
  return ('000000000'+num).slice(ss);
}

var MILLSECONDS_PER_DAY = 24 * 60 * 60 * 1000;

function nextDate(date, dayCount) {
  var nextDate = new Date(date.getTime() + MILLSECONDS_PER_DAY * dayCount);
  return nextDate;
};

function getAsideState() {
  let vd = viewData()
  let w = vd.viewWidth
  return w >= 1440? true: false;
};

export {
  goPage,
  openPage,
  getGoPage,
  goLoginIsBack,
  goReplace,
  dateFormatFmt,
  formatDate,
  getQueryString,
  toFixed,
  viewData,
  paramMd5,
  thirdFormat,
  eachObj,
  isString,
  isArray,
  isObject,
  scrollEnd,
  toDecimal2,
  addPreZero,
  nextDate,
  urlAddParams,
  getAsideState,
}

window.util = {
  goPage,
  openPage,
  getGoPage,
  goLoginIsBack,
  goReplace,
  dateFormatFmt,
  formatDate,
  getQueryString,
  toFixed,
  viewData,
  paramMd5,
  thirdFormat,
  eachObj,
  isString,
  isArray,
  isObject,
  scrollEnd,
  toDecimal2,
  addPreZero,
  nextDate,
  urlAddParams,
  getAsideState,
}