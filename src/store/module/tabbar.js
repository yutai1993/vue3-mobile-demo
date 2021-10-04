export default {
  namespaced: true,
  state: () => ({
    tabbar: false,
  }),
  mutations: {
    SETTABAR(state, flag){
      state.tabbar = flag
    }
  },
  actions: {

  }
}
