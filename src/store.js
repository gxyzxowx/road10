import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mItemID: ''
  },
  mutations: {
    setItem (state, value) {
      state.mItemID = value
    }
  },
  actions: {

  }
})
