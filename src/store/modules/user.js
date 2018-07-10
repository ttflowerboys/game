import * as types from '../mutation-types'

// state
const state = {
  // 用户登录状态
  loginStatus: false,
  // 用户token
  userToken: null,
  // 用户数据信息
  userData: [],
}

// actions
const actions = {
  /**
   * 记录用户信息
   */
  recordUserInfo({ commit }, res) {
    commit(types.RECORD_USERINFO, res)
  },
  userLogout({ commit }) {
    commit(types.LOGOUT)
  }

}

// getters
const getters = {
  userToken: state => state.userToken,
  userData: state => state.userData,
  loginStatus: state => state.loginStatus
}

// mutations
const mutations = {
  [types.RECORD_USERTOKEN](state, res){
    state.userToken = res
  },
  [types.RECORD_USERINFO](state, res) {
    localStorage.setItem('token', res.token)
    localStorage.setItem('username', JSON.stringify(res.username))
    state.userData = res.data
    state.userToken = res.token
    state.loginStatus = true
  },
  [types.LOGOUT](state) {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    state.userData = []
    state.userToken = null
    state.loginStatus = false
  }
}

export default {
    state,
    actions,
    getters,
    mutations
}