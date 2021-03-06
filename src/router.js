import Vue from 'vue'
import Router from 'vue-router'
import comFun from './assets/js/comfun.js'
// 定义组件

Vue.use(Router)

// 定义路由
const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('./Login.vue')
  },
  // Main.vue(HeaderR + router-view)
  {
    path: '/',
    name: 'main',
    component: () => import('./Main.vue'),
    // router-view
    children: [
      // 控制台control项目总览
      {
        path: '/control',
        name: 'control',
        component: () => import('./views/Control.vue')
      },
      // 生产监管大区
      {
        path: '/sc',
        name: 'sc',
        component: () => import('./views/SC/Home.vue'),
        children: [
          {
            path: '/sc/home',
            component: () => import('./views/SC/SChome.vue')
          }, {
            path: '/sc/SCdata',
            component: () => import('./views/SC/SCdata.vue')
          }, {
            path: '/sc/SCquality',
            component: () => import('./views/SC/SCquality.vue')
          }, {
            path: '/sc/SCgrade',
            component: () => import('./views/SC/SCgrade.vue')
          }, {
            path: '/sc/SCwarn',
            component: () => import('./views/SC/SCwarn.vue')
          }

        ]
      },
      // 施工监管大区
      {
        path: '/sg',
        name: 'sg',
        component: () => import('./views/SG/Home.vue')
      },
      // 管理大区
      {
        path: '/manage',
        name: 'manage',
        component: () => import('./views/manage/Home.vue'),
        children: [
          {
            path: '/manage/item',
            component: () => import('./views/manage/Mitem.vue')
          },
          {
            path: '/manage/equip',
            component: () => import('./views/manage/Mequip.vue')
          },
          {
            path: '/manage/recipe',
            component: () => import('./views/manage/Mrecipe.vue')
          },
          {
            path: '/manage/user',
            component: () => import('./views/manage/Muser.vue')
          }
        ]
      }
    ]
  }

]

// new Router实例，传routes配置参数注入路由
// 输出以便main.js挂载根实例
var router = new Router({
  routes
})
// 设置跳转规则（管理员或者未登录状态）
router.beforeEach((to, from, next) => {
  // 取得用户数据
  let username = comFun.getCookie('roadmUserID')
  if (!username && to.path !== '/login') {
    // console.log('没有用户数据或者用户数据过期' + username)
    next('/login')
  } else if (to.name === 'control') {
    // console.log('有' + username)
    // window.location.reload()
    next()
  } else {
    next()
  }
})

// 为了注释报错（相同途径点击会报错）
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
