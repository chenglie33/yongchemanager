import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    CommonCompany: [],
    CommonDriver: [],
    CommonOrder: []
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_CommonCompany: (state, CommonCompany) => {
      state.CommonCompany = CommonCompany
    },
    SET_CommonDriver: (state, CommonDriver) => {
      state.CommonDriver = CommonDriver
    },
    SET_CommonOrder: (state, CommonOrder) => {
      state.CommonOrder = CommonOrder
    }
  },
  actions: {
  },
  modules: {
  }
})
