import { getOrderStatusApi, getDriverListApi, getCompanyListApi, getCarInfoPageListApi } from '@/api/apilist'
import store from '../store'
export function getTypeText (type, key) {
  let option = []
  switch (type) {
    case 'carType':
      option = [
        {
          value: 1,
          label: '大巴(39-53座，包含司机）'
        },
        {
          value: 2,
          label: '中巴（14-19座，包含司机）'
        },
        {
          value: 3,
          label: '商务(7座，包含司机）'
        },
        {
          value: 4,
          label: '小巴（5座，包含司机）'
        }

      ]
      break
    case 'invoiceStatus':
      option = [
        {
          value: 1,
          label: '已开'
        },
        {
          value: 2,
          label: '未开'
        }

      ]
      break
    case 'driverStatus':
      option = [
        {
          value: 0,
          label: '空闲'
        },
        {
          value: 1,
          label: '接单中'
        }

      ]
      break
    case 'configType':
      option = [
        {
          value: 1,
          label: '机场'
        },
        {
          value: 2,
          label: '火车站'
        },
        {
          value: 3,
          label: '车站'
        }

      ]
      break
    case 'stationType':
      option = [
        {
          value: 1,
          label: '机场'
        },
        {
          value: 2,
          label: '火车站'
        },
        {
          value: 3,
          label: '车站'
        }

      ]
      break
    case 'wxuserType':
      option = [
        {
          value: 1,
          label: '注册用户'
        },
        {
          value: 2,
          label: '引流用户'
        }

      ]
      break
    case 'qutype':
      option = [
        {
          value: 1,
          label: '省'
        },
        {
          value: 2,
          label: '市'
        },
        {
          value: 3,
          label: '区'
        },
        {
          value: 4,
          label: '街道'
        }

      ]
      break
    case 'userType':
      option = [
        {
          value: 1,
          label: '超级管理员'
        },
        {
          value: 2,
          label: '企业用户'
        }

      ]
      break
    case 'orderCostStatus':
      option = [
        {
          value: 1,
          label: '待付款'
        },
        {
          value: 3,
          label: '付完定金'
        },
        {
          value: 4,
          label: '全部付完'
        }

      ]
      break
    case 'orderType':
      option = [
        {
          value: 1,
          label: '接送机'
        },
        {
          value: 2,
          label: '接送火车'
        },
        {
          value: 3,
          label: '包车'
        }

      ]
      break
    case 'orderStatus':
      option = [
        {
          value: 0,
          label: '下单'
        },
        {
          value: 1,
          label: '待接单'
        },
        {
          value: 2,
          label: '已接单'
        },
        {
          value: 3,
          label: '执行中'
        },
        {
          value: 4,
          label: '拒绝'
        },
        {
          value: 5,
          label: '已完成'
        },
        {
          value: 6,
          label: '申请开票中'
        },
        {
          value: 7,
          label: '已开票'
        }

      ]
  }

  if (key || key == 0) {
    let label
    option.some((item) => {
      if (item.value == key) {
        label = item.label
        return true
      }
    })
    return label
  } else {
    return option
  }
}

export function getTypeTextRemote (type, key) {
  const option = type

  if (key) {
    let label
    option.some((item) => {
      if (item.value == key) {
        label = item.label
        return true
      }
    })
    return label
  } else {
    return option
  }
}

export async function getCommonData () {
  await getOrderStatusApi().then(data => {
    store.commit('SET_CommonOrder', data.content)
  })
  await getDriverListApi().then(data => {
    store.commit('SET_CommonDriver', data.content)
  })
  await getCompanyListApi().then(data => {
    store.commit('SET_CommonCompany', data.content)
  })
}
