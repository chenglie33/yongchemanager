import { request } from '@/utils/request'
export function loginApi (data) {
  return request({
    url: '/sys/loginPc',
    method: 'post',
    data
  })
}
export function loginoutApi () {
  return request({
    url: '/sys/logoutPc',
    method: 'get'
  })
}
export function getUserInfoApi () {
  return request({
    url: '/sys/getUserInfo',
    method: 'get'
  })
}

export function getCarHistoryApi (data) {
  return request({
    url: '/history/getCarHistory',
    method: 'post',
    data
  })
}

export function getCarTypeApi () {
  return request({
    url: '/common/getCarType',
    method: 'get'
  })
}

export function getCarListApi (data) {
  return request({
    url: '/common/getCarList',
    method: 'post',
    data
  })
}

export function carRealDetailsApi (data) {
  return request({
    url: '/real/carRealDetails',
    method: 'post',
    data
  })
}
