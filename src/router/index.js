import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search/search')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '../views/category/category')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "category" */ '../views/cart/cart')
  },
  {
    path: '/member',
    name: 'member',
    component: () => import(/* webpackChunkName: "category" */ '../views/member/member')
  },
  {
    path: '/goods-list',
    name: 'goods-list',
    component: () => import(/* webpackChunkName: "goods-list" */ '../views/goods-list/goods-list')
  },
  {
    path: '/goods-detail',
    name: 'goods-detail',
    component: () => import(/* webpackChunkName: "goods-list" */ '../views/goods-detail/goods-detail')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
