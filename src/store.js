import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mItemID: '',
    mItemDes: '',
    selectItemID: '',
    equipUseItemID: '',
    klUse: {
      bd: '',
      itemID: '',
      mKlID: ''
    }
  },
  mutations: {
    setItem (state, value) {
      state.mItemID = value[0]
      state.mItemDes = value[1]
    },
    // 可以是管理模块里面的项目ID，用户ID，设备ID，材料ID
    selectItemID (state, value) {
      state.selectItemID = value
    },
    // 设备管理修改设备时专用
    equipUseItemID (state, value) {
      state.equipUseItemID = value
    },
    klUse (state, value) {
      // value是一个对象
      state.klUse = value
    }
  },
  actions: {

  }
})
