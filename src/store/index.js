import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 封装本地存储，vuex-persistedstate
// vuex-persistedstate --->持久化state

// 1.下载
// yarn add vuex-persistedstate@3.2.1
// 2.引入
// -import createPersistedState from 'vuex-persistedstate'
// 3.调用
//  -plugins:[createPersistedState()]

// 配置项
// key：默认值是vuex
// storage：存储的方式，默认值是本地存储
// reducer：指定持久化那些数据，return一个对象，对象就作为存储的value
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HOME_TOUTIAO',
      // storage: window.sessionStorage,
      reducer({ tokenObj, myChannels, histories }) {
        return { tokenObj, myChannels, histories }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      // 将token存在vuex
      state.tokenObj = token
    },
    /**
     *
     * @param {Array} channels //删除或添加成功后最新的channels
     */
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },
    /**
     *
     * @param {*} state
     * @param {*} histories 删除或添加之后新的历史
     */
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  }
})
