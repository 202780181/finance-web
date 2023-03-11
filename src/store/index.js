import Vue from 'vue'
import Vuex from 'vuex'
import local from './modules/demo-local'   // 引入本地 store 模块
import getters from './getters'       // 引入本地 getters
import { ibpsStore, ibpsStoreGetters } from 'mars-ui-frame' // 引入 mars-ui-frame ibps store

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      ibps: ibpsStore,
      local,
  },
  getters: Object.assign({}, getters, ibpsStoreGetters)
})
