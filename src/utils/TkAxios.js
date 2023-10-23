import axios from 'axios'
import Router from '@/router/index'
import { Message } from 'element-ui'
// import Loading from '@/components/public/loading'
import Vue from 'vue'
// import QS from 'qs'
import { getUserInfoFromStorage, setUserInfoToStorage } from './LocalStoragePerform'
let vm = new Vue()
// Vue.use(Loading)
// 如果过期时间超过30分钟，return 2 跳转登录页;不超过30分钟，retunr 1 刷新token；没过期，return 0 不操作
const getParamsPath = (paramsUrl) => {
  let paramsPath = ''
  if (!paramsUrl || !Object.prototype.toString.call(paramsUrl) === '[object Object]') {
    return ''
  }
  for (let key in paramsUrl) {
    paramsPath += `/${paramsUrl[key]}`
  }
  return paramsPath
}
const judgeTokenState = {
  'tokenInTime': 0,
  'tokenOutTime': 1,
  'tokenOutLongTime': 2
}
const nullData = {
  data: null
}
// base64EncodeURi 编码和解码
const b64EncodeUnicode = (str) => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1)
  }))
}
// console.log(b64EncodeUnicode('我是很厉害的'))
const b64DecodeUnicode = (str) => {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join('')
  )
}
const decodeToken = (token = '') => {
  token = token.replace(/-/g, '+')
  token = token.replace(/_/g, '/')
  // bass64解码bug
  // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZUlkIjoiSU5TVElUVVRJT04iLCJ0aW1lc3RhbXAiOjE1NjU5MjU3NTMwMDB9.qO41SbjZ563nWeToSyPVqpd47hSabeTiGHROCmmnHjQ'
  let tokenArr = token.split('.')
  let header = JSON.parse(b64DecodeUnicode(tokenArr[0]))
  let params = JSON.parse(b64DecodeUnicode(tokenArr[1]))
  return {
    header, params
  }
}
const getTokenLoseEfficacy = (token, minutes) => { // 判断token是否失效
  let timesTamp = decodeToken(token).params.exp
  // var  timesTamp=timesTamp*1000
  // 判断是否过期
  let nowTimestamp = new Date().getTime() / 1000
  if (nowTimestamp > timesTamp + 60 * minutes) {
    // 根据refreshToken 请求token
    return judgeTokenState['tokenOutLongTime']
  }
  if (nowTimestamp < timesTamp + 60 * minutes && nowTimestamp > timesTamp) {
    return judgeTokenState['tokenOutTime']
  }
  return judgeTokenState['tokenInTime']

  // 啥也不做
}
const getTokenInfo = () => {
  let userInfo = JSON.parse(getUserInfoFromStorage())
  if (!userInfo || !userInfo.tokenInfo) {
    return null
  }
  return userInfo.tokenInfo
}
const getToken = (tokenInfo) => {
  if (!tokenInfo || !tokenInfo.accessToken) {
    return
  }
  return tokenInfo.accessToken
}

class
NBAxios {
  constructor (baseUrl = '') {
    this._baseUrl = baseUrl
    // this.judgeTimestamp=getTokenLoseEfficacy(token,30)
    this.judgeTimestamp = judgeTokenState['tokenInTime']
    // post请求头
    axios.defaults.headers.post['Content-Type'] =
      'application/json;charset=UTF-8'
      // 'application/x-www-form-urlencoded'
    axios.interceptors.request.use(
      config => {
        // 设置token
        let token = getToken(getTokenInfo()) || ''
        config.headers.common['token'] = token
        // console.log('config', config)
        return config
      },
      err => {
        Message.error({ message: '请求超时!' + err })
        // return Promise.resolve(err);
      }
    )
    axios.interceptors.response.use(
      data => {
        // if (data.status && data.status === 200 && data.data.status === 500) {
        //   // Message.error({ message: data.data.msg })
        //   return data
        // }
        // if (data.data.message && data.data.code == SUCCESS_CODE) {
        //   // Message.success({ message: data.data.message })
        //   return data
        // }
        // if (data.data.message && data.data.code != SUCCESS_CODE) {
        //   Message.error({ message: data.data.message })
        //   return
        // }
        return data
      },
      err => {
        vm.$loading.hide()
        if (err.response.status === 504 || err.response.status === 404) {
          Message.error({ message: '服务器被吃了⊙﹏⊙∥' })
        } else if (err.response.status === 403) {
          Message.error({ message: '权限不足,请联系管理员!' })
        } else if (err.response.status === 401) {
          Message.error({ message: err.response.data.msg })
        } else {
          if (err.response.data.msg) {
            Message.error({ message: err.response.data.msg })
          } else {
            Message.error({ message: '未知错误!' })
          }
        }
        // return Promise.resolve(err);
      }
    )
  }

  setBaseUrl (baseUrl) {
    this._baseUrl = baseUrl
  }
  request (url, options) {
    return new Promise((resolve, reject) => {
      const defaultOptions = {
        url: `${this._baseUrl}${url}`
      }
      const newOptions = { ...options, ...defaultOptions }
      // getToken
      // console.log('newOptions', newOptions)
      let token = getToken(getTokenInfo()) || ''
      // deal with Timestamp start
      if (!token) {
        axios.request(newOptions)
          .then(res =>
            resolve(res))
        // .catch(error => console.log(error));
        return
      }
      if (this.judgeTimestamp === judgeTokenState['tokenOutLongTime']) {
        this.judgeTimestamp = judgeTokenState['tokenInTime']
        Router.replace({ path: '/login' })
        resolve(nullData)
        return
      }
      if (this.judgeTimestamp === judgeTokenState['tokenOutTime']) {
        this.judgeTimestamp = judgeTokenState['tokenInTime']
        this.refreshTokenRequst().then(res => {
          if (!res) {
            resolve(nullData)
          } else {
            // console.log('axios2')
            axios.request(newOptions)
              .then(res => {
                resolve(res)
              })
          }
        })
        return
      }
      // deal with Timestamp end
      axios.request(newOptions)
        .then(res => resolve(res))
        .catch(error => console.log(error))
    })
  }
  get (url, paramsUrl, params, isLoginPort = false) { // paramsUrl Object()
    if (!isLoginPort) {
      let token = getToken(getTokenInfo()) || ''
      this.judgeTimestamp = getTokenLoseEfficacy(token, 30)
    }
    return new Promise((resolve, reject) => {
      let paramsPath = getParamsPath(paramsUrl) || ''
      // console.log('params', params, ...params, QS.stringify(...params))
      this.request(url + paramsPath, {
        method: 'get',
        params: params
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  post (url, params, isLoginPort = false) {
    if (!isLoginPort) {
      let token = getToken(getTokenInfo()) || ''
      this.judgeTimestamp = getTokenLoseEfficacy(token, 30)
    }
    var _this = this
    return new Promise((resolve, reject) => {
      // console.log('params', params, QS.stringify(...params))
      _this.request(url, {
        method: 'post',
        data: params

      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  uploadFileRequest (url, params) {
    return axios({
      method: 'post',
      url: `${this._baseUrl}${url}`,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  // 刷新登录
  refreshTokenRequst () {
    return new Promise((resolve, reject) => {
      let tokenInfo = getTokenInfo()
      if (!tokenInfo || !tokenInfo.refreshToken) {
        resolve(nullData)
      }
      // let userInfo = JSON.parse(getUserInfoFromStorage())
      // console.log(userInfo, '-------------------------')
      let refreshToken = tokenInfo.refreshToken || ''
      let params = {
        refreshToken: refreshToken
      }

      this.request('/imis/user/srv/api/auth/refreshToken', {
        method: 'post',
        params: params
      })
        .then((res) => {
          // 刷新完成后,将刷新token和refreshToken存储到本地
          if (res.data.data) {
            let userInfo = JSON.parse(getUserInfoFromStorage())
            userInfo.tokenInfo = res.data.data
            setUserInfoToStorage(userInfo)
          }
          resolve(res)
        })
    })
  }
}
export default NBAxios
