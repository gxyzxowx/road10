import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mItemID: '',
    mItemDes: ''
  },
  mutations: {
    setItem (state, value) {
      state.mItemID = value[0]
      state.mItemDes = value[1]
    }
  },
  actions: {

  }
})
