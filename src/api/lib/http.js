/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/3/21 15:41
 */
import originJsonp from 'jsonp'
import axios from 'axios'
import qs from 'qs'
import {getLocalJWT} from 'common/js/cache'
import {paramMd5, isObject} from 'common/js/util'

// axios 配置
const axiosRequestConfig = {
  // 自定义的请求头
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 超时设置
  timeout: 12000,
  // 跨域是否带Token
  withCredentials: true,
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  // responseType: 'json'
}

// axios实例
const request = axios.create(axiosRequestConfig)

//POST传参序列化
request.interceptors.request.use((config) => {
  if (config.method === 'post') {
    paramMd5(config.data);
    config.data = qs.stringify(config.data);
  } else if (config.method === 'get') {
    config.params.t = Date.now();
  }

  let jwt = getLocalJWT();
  if (jwt) {
    config.headers['Authorization'] = `Bearer ${jwt}`
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


/**
 * 超时重新请求的全局功能
 * 设置全局的请求次数，请求的间隙
 * @Date: 2018-05-13 15:03:36
 */

request.defaults.retry = 0;
request.defaults.retryDelay = 500;

//返回状态判断
request.interceptors.response.use((res) => {
  if (!res.data) {
    return Promise.reject(res.data);
  }
  return res.data;
}, (error) => {
  if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1){
    let config = error.config
    if(config && config.retry) {
      config.__retryCount = config.__retryCount || 0;
      if(config.__retryCount < config.retry) {
        config.__retryCount += 1;
        var backoff = new Promise(function(resolve) {
          setTimeout(function() {
            resolve();
          }, config.retryDelay || 1);
        });

        return backoff.then(function() {
          console.log('超时重新请求')
          return request(config);
        });
      }
    }
  }
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        break

      case 401:
        error.message = '未授权，请登录'
        break

      case 403:
        error.message = '拒绝访问'
        break

      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break

      case 408:
        error.message = '请求超时'
        break

      case 500:
        error.message = '服务器内部错误'
        break

      case 501:
        error.message = '服务未实现'
        break

      case 502:
        error.message = '网关错误'
        break

      case 503:
        error.message = '服务不可用'
        break

      case 504:
        error.message = '网关超时'
        break

      case 505:
        error.message = 'HTTP版本不受支持'
        break

      default:
    }
  } else {
    error.message = '无网络连接'
  }
  console.log(error)
  return Promise.reject(error);
});

//编码参数数据
export function param(data) {
  let key, value, arr = [];

  function getVal(val) {
    val = val !== undefined ? val : '';
    return encodeURIComponent(val.toString())
  }

  if (data) {
    if (isObject(data)) {
      for (key in data) {
        value = getVal(data[key]);
        arr.push(key + '=' + value);
      }
    } else if (typeof data === 'string') {
      data = data.split('&');
      for (var i = 0, len = data.length; i < len; i++) {
        key = data[i].split('=')[0];
        value = getVal(data[i].split('=')[1]);
        arr.push(key + '=' + value);
      }
    }
    data = arr.join('&').replace('/%20/g', '+');
  } else {
    data = ''
  }
  return data
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    request.get(url, params)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function post(url, params) {
  return new Promise((resolve, reject) => {
    request.post(url, params)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function jsonp(url, data, name) {
  if (!data.t) {
     data.t = Date.now()
  }
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  let prefix = 'ct'
  if (data.cat1) {
    prefix += data.cat1.replace(/-/g, '_')

    if (data.actionType) {
      prefix += '__'
    }
  } else if (data.p && data.s) {
    prefix = data.p + '__' + data.s
  }
  if (data.actionType) {
    prefix += data.actionType.replace(/-/g, '_')
  }
  let option = {
    prefix: prefix,
    timeout: 10000
  }
  if(name) {
    option.name = name
  }
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (error, data) => {
      if (!error) {
        resolve(data)
      } else {
        error.message = '无网络连接'
        reject(error)
      }
    })
  })
}
