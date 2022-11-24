import { createRouter, createWebHistory } from 'vue-router'
import aboutView from "@/views/AboutView";

const routes = [
  {
    path: '/',
    name: 'aboutView',
    component: aboutView
  },
  {
    path: '/SwiperView',
    name: 'SwiperView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/SwiperView.vue')
  },
  {
    path: '/src/components/itemMusic.vue',
    name: 'itemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/itemMusic')
  },
  {
    path: '/SearchMusic',
    name: 'SearchMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/item/SearchMusic.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/item/Login')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
