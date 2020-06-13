import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/pages/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/user-manage',
      component: () => import(/* webpackChunkName: "home" */ '@/pages/home.vue'),
      children: [
        // 用户管理
        {
          path: '/user-manage',
          name: 'user-manage',
          component: () => import(/* webpackChunkName: "user-manage" */ '@/pages/user-manage/index.vue')
        },
        {
          path: '/test',
          name: 'test',
          component: () => import(/* webpackChunkName: "user-manage" */ '@/pages/test/index.vue')
        },
        // 菜单管理
        {
          path: '/menu-manage',
          name: 'menu-manage',
          component: () => import(/* webpackChunkName: "menu-manage" */ '@/pages/menu-manage/index.vue')
        },
        // 商品管理
        {
          path: '/comm-manage',
          name: 'comm-manage',
          component: () => import(/* webpackChunkName: "comm-manage" */ '@/pages/comm-manage/index.vue')
        },
        // 首页轮播图管理
        {
          path: '/home-pic-manage',
          name: 'home-pic-manage',
          component: () => import(/* webpackChunkName: "home-pic-manage" */ '@/pages/home-pic-manage/index.vue')
        },
        // 商品分类管理
        {
          path: '/comm-classify-manage',
          name: 'comm-classify-manage',
          component: () => import(/* webpackChunkName: "comm-classify-manage" */ '@/pages/comm-classify-manage/index.vue')
        },
        // 客户管理
        {
          path: '/client-manage',
          name: 'client-manage',
          component: () => import(/* webpackChunkName: "client-manage" */ '@/pages/client-manage/index.vue')
        },
        // 订单管理
        {
          path: '/order-manage',
          name: 'order-manage',
          component: () => import(/* webpackChunkName: "order-manage" */ '@/pages/order-manage/index.vue')
        },
        // 热门位商品管理
        {
          path: '/hot-comm-manage',
          name: 'hot-comm-manage',
          component: () => import(/* webpackChunkName: "hot-comm-manage" */ '@/pages/hot-comm-manage/index.vue')
        },
        // 门店信息管理
        {
          path: '/shop-info-manage',
          name: 'shop-info-manage',
          component: () => import(/* webpackChunkName: "shop-info-manage" */ '@/pages/shop-info-manage/index.vue')
        },
        // 司机信息管理
        {
          path: '/driver-info-manage',
          name: 'driver-info-manage',
          component: () => import(/* webpackChunkName: "driver-info-manage" */ '@/pages/driver-info-manage/index.vue')
        }
      ]
    }
  ]
})
