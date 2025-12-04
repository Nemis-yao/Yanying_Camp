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
      path:'/404',
      name:'Rumor',
      component:()=>import('@/Rumor/index.vue')
    }
  ],
})

export default router
