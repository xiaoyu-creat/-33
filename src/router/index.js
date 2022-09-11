import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// SPA
// 首屏加载速度很慢
// 路由懒加载
//  -使用到了路由页面，再去请求他

// 懒加载的chunk 默认的名字是模块的路径
// /* webpackChunkName */
const routes = [
  {
    path: '/',
    component: () => import('views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import(/* webpackChunkName:"base" */ 'views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:"base" */ 'views/Video')
      },
      {
        path: '/qa',
        component: () => import('views/QA')
      },
      {
        path: '/profile',
        component: () => import('views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
