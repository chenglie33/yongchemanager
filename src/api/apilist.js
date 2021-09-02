import { request } from '@/utils/request'
export function loginApi (data) {
  return request({
    url: '/ht-api/sys/loginPc',
    method: 'post',
    data
  })
}
export function loginoutApi () {
  return request({
    url: '/ht-api/sys/logoutPc',
    method: 'get'
  })
}
export function getUserInfoApi () {
  return request({
    url: '/ht-api/sys/getUserInfo',
    method: 'get'
  })
}

export function getCarHistoryApi (data) {
  return request({
    url: '/ht-api/history/getCarHistory',
    method: 'post',
    data
  })
}

export function getCarTypeApi () {
  return request({
    url: '/ht-api/common/getCarType',
    method: 'get'
  })
}

export function getCarListApi (data) {
  return request({
    url: '/ht-api/common/getCarList',
    method: 'post',
    data
  })
}

export function carRealDetailsApi (data) {
  return request({
    url: '/ht-api/real/carRealDetails',
    method: 'post',
    data
  })
}
export function getCarInfoPageListApi (data) {
  return request({
    url: '/ht-api/car/getCarInfoPageList',
    method: 'post',
    data
  })
}

export function getCompanyListApi () {
  return request({
    url: '/ht-api/common/getCompanyList',
    method: 'get'
  })
}
export function getDriverListApi () {
  return request({
    url: '/ht-api/common/getDriverList',
    method: 'post'
  })
}
export function getOrderStatusApi () {
  return request({
    url: '/ht-api/common/getOrderStatus',
    method: 'get'
  })
}

export function getOrderPageListApi (data) {
  return request({
    url: '/ht-api/order/getOrderPageList',
    method: 'post',
    data
  })
}
export function delCarInfoApi (data) {
  return request({
    url: 'ht-api/car/delCarInfo',
    method: 'post',
    data
  })
}

export function addCarInfoApi (data) {
  return request({
    url: 'ht-api/car/addCarInfo',
    method: 'post',
    data
  })
}

export function updateCarInfoApi (data) {
  return request({
    url: '/ht-api/car/updateCarInfo',
    method: 'post',
    data
  })
}

export function getInvoiceOrderPageListApi (data) {
  return request({
    url: '/ht-api/order/getInvoiceOrderPageList',
    method: 'post',
    data
  })
}

export function getInvoiceInfoApi (data) {
  return request({
    url: '/ht-api/order/getInvoiceInfo',
    method: 'post',
    data
  })
}

export function releaseOrderApi (data) {
  return request({
    url: '/ht-api/order/releaseOrder',
    method: 'post',
    data
  })
}
export function orderInvoicApi (data) {
  return request({
    url: '/ht-api/order/orderInvoice',
    method: 'post',
    data
  })
}

export function getSysUserPageListApi (data) {
  return request({
    url: '/ht-api/sys/getSysUserPageList',
    method: 'post',
    data
  })
}

export function addSysUserApi (data) {
  return request({
    url: '/ht-api/sys/addSysUser',
    method: 'post',
    data
  })
}

export function updateSysUserApi (data) {
  return request({
    url: '/ht-api/sys/updateSysUser',
    method: 'post',
    data
  })
}
export function delSysUserApi (data) {
  return request({
    url: '/ht-api/sys/delSysUser',
    method: 'post',
    data
  })
}

export function getDriverInfoPageListApi (data) {
  return request({
    url: '/ht-api/driver/getDriverInfoPageList',
    method: 'post',
    data
  })
}

export function getWxUserPageListApi (data) {
  return request({
    url: '/ht-api/wxUser/getWxUserPageList',
    method: 'post',
    data
  })
}

export function getRegionPageListApi (data) {
  return request({
    url: '/ht-api/config/getRegionPageList',
    method: 'post',
    data
  })
}

export function getAddressBookPageListApi (data) {
  return request({
    url: '/ht-api/config/getAddressBookPageList',
    method: 'post',
    data
  })
}

export function getCostConfigurePageListApi (data) {
  return request({
    url: '/ht-api/config/getCostConfigurePageList',
    method: 'post',
    data
  })
}

export function addRegionApi (data) {
  return request({
    url: '/ht-api/config/addRegion',
    method: 'post',
    data
  })
}
export function updateRegionApi (data) {
  return request({
    url: '/ht-api/config/updateRegion',
    method: 'post',
    data
  })
}

export function delRegionApi (data) {
  return request({
    url: '/ht-api/config/delRegion',
    method: 'post',
    data
  })
}

export function getRegionTreeApi () {
  return request({
    url: '/ht-api/common/getRegionTree',
    method: 'get'
  })
}

export function addAddressBookApi (data) {
  return request({
    url: '/ht-api/config/addAddressBook',
    method: 'post',
    data
  })
}

export function updateAddressBookApi (data) {
  return request({
    url: '/ht-api/config/updateAddressBook',
    method: 'post',
    data
  })
}

export function delAddressBookApi (data) {
  return request({
    url: '/ht-api/config/delAddressBook',
    method: 'post',
    data
  })
}

export function addCostConfigureApi (data) {
  return request({
    url: '/ht-api/config/addCostConfigure',
    method: 'post',
    data
  })
}

export function updateCostConfigureApi (data) {
  return request({
    url: '/ht-api/config/updateCostConfigure',
    method: 'post',
    data
  })
}

export function delCostConfigureApi (data) {
  return request({
    url: '/ht-api/config/delCostConfigure',
    method: 'post',
    data
  })
}

export function getCompanyInfoPageApi (data) {
  return request({
    url: '/ht-api/company/getCompanyInfoPage',
    method: 'post',
    data
  })
}

export function addCompanyInfoApi (data) {
  return request({
    url: '/ht-api/company/addCompanyInfo',
    method: 'post',
    data
  })
}

export function updateCompanyInfoApi (data) {
  return request({
    url: '/ht-api/company/updateCompanyInfo',
    method: 'post',
    data
  })
}

export function delCompanyInfoApi (data) {
  return request({
    url: '/ht-api/company/delCompanyInfo',
    method: 'post',
    data
  })
}

export function getAddressBookListApi (data) {
  return request({
    url: '/ht-api/config/getAddressBookList',
    method: 'post',
    data
  })
}
