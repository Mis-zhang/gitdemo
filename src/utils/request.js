import axios from 'axios'
import { assert } from '../utils'
import { KJ_CODE, HTTP_CODE, HTTP_STATUS } from '../consts/statusCode'
import { message } from 'antd'
import { apiBaseUrl } from '../consts/env'
import { ACCESSTOKEN, CORGITOKENENVDATA, APP_ID, TENANT_ID, LOGIN_OUT } from './env'
import Cookie from './cookie'

const baseURL = process.env.NODE_ENV === 'production' ? apiBaseUrl : '/service'

axios.defaults.withCredentials = false
axios.defaults.timeout = 50000
axios.defaults.baseURL = baseURL
axios.defaults.headers.common.appId = APP_ID
axios.defaults.headers.common.tenantId = TENANT_ID
axios.defaults.headers.common['Content-Type'] = 'application/json'

// 中间件 拦截请求-
axios.interceptors.request.use(
  config => {
    if (ACCESSTOKEN) {
      config.headers.Authorization = `Bearer ${ACCESSTOKEN}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)
axios.interceptors.response.use(
  response => {
    if ([HTTP_CODE.AUTHENTICATE, KJ_CODE.AUTHENTICATE].indexOf(response.data.code) > -1) {
      logout()
      return Promise.reject(response.data)
    }
    return response
  },
  err => {
    if (!err.response) {
      return
    }
    const res = err.response
    if (res.status === HTTP_STATUS.AUTHENTICATE) {
      logout()
      return Promise.reject(err)
    } else {
      message.error(`服务器异常`)
      return Promise.reject(err)
    }
  },
)

function logout() {
  Cookie.delete(CORGITOKENENVDATA, '/', '.kaikeba.com')
  LOGIN_OUT()
}

const exceptionHandling = data => {
  if (!data) {
    return false
  }

  if (data.status === HTTP_STATUS.SUCCESS) {
    return data
  } else {
    assert(false, data.statusText)
  }
  return false
}

/**
 * get
 * @param url
 * @param data
 * @returns {Promise}
 */

const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then(response => {
        const res = exceptionHandling(response)
        if ([HTTP_CODE.SUCCESS, KJ_CODE.SUCCESS].indexOf(res.data.code) > -1) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * post
 * @param url
 * @param data
 * @returns {Promise}
 */

const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        const res = exceptionHandling(response)
        if ([HTTP_CODE.SUCCESS, KJ_CODE.SUCCESS].indexOf(res.data.code) > -1) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      err => {
        reject(err)
      },
    )
  })
}

/**
 * put
 * @param url
 * @param data
 * @returns {Promise}
 */

const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        const res = exceptionHandling(response)
        if ([HTTP_CODE.SUCCESS, KJ_CODE.SUCCESS].indexOf(res.data.code) > -1) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      err => {
        reject(err)
      },
    )
  })
}

/**
 * patch
 * @param url
 * @param data
 * @returns {Promise}
 */

const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        const res = exceptionHandling(response)
        if ([HTTP_CODE.SUCCESS, KJ_CODE.SUCCESS].indexOf(res.data.code) > -1) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      err => {
        reject(err)
      },
    )
  })
}

export default {
  get,
  post,
  put,
  patch,
}
