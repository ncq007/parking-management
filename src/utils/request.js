import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
      config.headers['publicKey'] = sessionStorage.getItem('pk')
      config.headers['loginCode'] = sessionStorage.getItem('usernameEn')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log('resres', response)
    const res = response.data
    // code 为 100 说明返回的是正确的结果，type 为 application/octet-stream 说是导出 excel 文件
    if (res.code === '100' || res.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || res.type === 'application/octet-stream') {
      return res
    } else {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 30062：秘钥失效，30076：解密用户失败
      if (res.code === '30062' || res.code === '30076') {
        // to re-login
        MessageBox.confirm(res.msg + '，请重新登录！', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
