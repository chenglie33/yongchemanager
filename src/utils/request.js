import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
export const request = axios.create({
  timeout: 300000
})
request.interceptors.response.use(
  function (res) {
    if (res.status !== 200 || res.data.status !== 200) {
      Message({
        message: res.data.msg,
        type: 'warning'
      })
      return Promise.reject('异常接口报错')
    }
    return Promise.resolve(res.data)
  },
  function (err) {
    console.log(err.response)
    if (err.response.status === 401) {
      router.push({ path: '/login' })
    } else {
      return Promise.reject('异常接口报错')
    }
  }
)
