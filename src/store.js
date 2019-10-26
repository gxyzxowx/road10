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
    },
    // 关闭新建/修改的modal状态量true/false
    modalState: '',
    modalStateKl: ''
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
    // 新建、修改矿料时用的项目
    setKlUseItem (state, value) {
      state.klUse.itemID = value
    },
    // 新建、修改矿料时用的标段
    setKlUseBd (state, value) {
      state.klUse.bd = value
    },
    // 新建、修改矿料时用的矿料ID
    setKlUsemKlID (state, value) {
      state.klUse.mKlID = value
    },
    // 关闭新建/修改的Modal
    setModalState (state, value) {
      state.modalState = value
    },
    // 关闭新建/修改的Modal(矿料列表专用)
    setModalStateKl (state, value) {
      state.modalStateKl = value
    }
  },
  actions: {

  }
})
