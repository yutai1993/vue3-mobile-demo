import { createStore } from 'vuex'
import index from './module/module_index'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ...index
  }
})
