import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from '@/layout/frame.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Frame,

    children: [
      {
        path: '/',
        name: 'Homes',
        activeMenu: 'Home',
        meta: {
          activeMenu: 'Home'
        },
        component: () => import(/* webpackChunkName: "OrderManage" */ '@/views/Home.vue')
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
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
