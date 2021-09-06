import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from '@/layout/frame.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Frame,
    redirect: '/home/current',
    children: [
      {
        path: 'current',
        name: 'Homes',
        activeMenu: 'Home',
        meta: {
          activeMenu: 'Home'
        },
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'his',
        name: 'his',
        activeMenu: 'his',
        meta: {
          activeMenu: 'his'
        },
        component: () => import('@/views/histroy/histroys.vue')
      }
    ]
  },
  {
    path: '/orderManage',
    name: 'OrderManage',
    component: Frame,

    children: [
      {
        path: '/',
        name: 'OrderManages',
        meta: {
          activeMenu: 'OrderManage'
        },
        component: () => import(/* webpackChunkName: "OrderManage" */ '@/views/orderManage/OrderManage.vue')
      }
    ]

  },
  {
    path: '/financialmanage',
    name: 'financialmanage',
    component: Frame,

    children: [
      {
        path: '/',
        name: 'financialmanage',
        meta: {
          activeMenu: 'financialmanage'
        },
        component: () => import(/* webpackChunkName: "OrderManage" */ '@/views/financialmanage/financialmanage.vue')
      }
    ]

  },
  {
    path: '/carmanage',
    name: 'carmanage',
    component: Frame,

    children: [
      {
        path: '/',
        name: 'carmanages',
        meta: {
          activeMenu: 'carmanage'
        },
        component: () => import(/* webpackChunkName: "CarManage" */ '@/views/carManage/CarManage.vue')
      }
    ]

  },
  {
    path: '/personmanage',
    name: 'personmanage',
    component: Frame,

    children: [
      {
        path: '/',
        name: 'personmanagess',
        meta: {
          activeMenu: 'personmanage'
        },
        component: () => import(/* webpackChunkName: "PersonManage" */ '@/views/personManage/PersonManage.vue')
      },
      {
        path: '/personmanage/driver',
        name: 'driver',
        meta: {
          activeMenu: 'driver'
        },
        component: () => import(/* webpackChunkName: "driver" */ '@/views/personManage/DriverManage.vue')
      },
      {
        path: '/personmanage/weixin',
        name: 'weixin',
        meta: {
          activeMenu: 'weixin'
        },
        component: () => import(/* webpackChunkName: "WeixinManager" */ '@/views/personManage/WeixinManage.vue')
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: Frame,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'profile',
        activeMenu: 'profile',
        meta: {
          activeMenu: 'profile'
        },
        component: () => import('@/views/profile/profile.vue')
      }

    ]
  },
  {
    path: '/configmanage',
    name: 'configmanage',
    component: Frame,

    children: [
      {
        path: '/',
        name: 'configmanages',
        meta: {
          activeMenu: 'configmanage'
        },
        component: () => import(/* webpackChunkName: "configManage" */ '@/views/configManage/configManage.vue')
      }, {
        path: '/configmanage/dizhibu',
        name: 'dizhibu',
        meta: {
          activeMenu: 'dizhibu'
        },
        component: () => import(/* webpackChunkName: "dizhibu" */ '@/views/configManage/dizhibu.vue')
      },
      {
        path: '/configmanage/feiyong',
        name: 'feiyong',
        meta: {
          activeMenu: 'feiyong'
        },
        component: () => import(/* webpackChunkName: "feiyong" */ '@/views/configManage/feiyong.vue')
      },
      {
        path: '/configmanage/gongsi',
        name: 'gongsi',
        meta: {
          activeMenu: 'gongsi'
        },
        component: () => import(/* webpackChunkName: "gongsi" */ '@/views/configManage/company.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/home/current'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
