import Vue from 'vue'
import Vuex from 'vuex' // 引入vuex

Vue.use(Vuex) // 使用插件

export default new Vuex.Store({
  state: {
    title: '系统演练' // 加一个状态
  },
  getter: {

  },
  mutations: {
    change(state , title){
      state.title = title
    }
  },
  actions: {

  }
})
