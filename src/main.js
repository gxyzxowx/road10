import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/style.css'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

// 全局引用公共函数
import comFun from './comfun.js'

// Vue.use(VueAxios, axios)
// Vue.prototype.$ajax = axios
Vue.prototype.comFun = comFun

Vue.use(iView)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// export default vue
