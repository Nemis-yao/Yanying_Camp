import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      component:()=>import('@/views/HomePage.vue')
    },
    {
      path:'/FengWen',
      name:'FengWen',
      component:()=>import('@/views/FengWen.vue')
    }
  ],
})

export default router
