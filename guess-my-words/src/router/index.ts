// Composables
import APIService from '@/services/APIService'
import { useStore } from '@/store/app'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/home',
        component: () => import('@/views/HomeLoggedView.vue'),
      },
      {
        path: '/edit',
        component: () => import('@/views/EditView.vue'),
      },
      
      {
        path: '/edit/:mapId',
        component: () => import('@/views/EditView.vue'),
      },

      {
        path: '/play',
        component: () => import('@/views/PlayView.vue'),
      },
      {
        path: '/play/:mapId',
        component: () => import('@/views/PlayView.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from, next) => {

  const store = useStore()
  const token = localStorage.getItem('token')
  if(store.getUserAccount?.id === -1 && token) {
    const data = await APIService.get('/api/users/account')
    store.setUserAccount(data)
  } 
  if(store.isLogged && to.fullPath === '/') {
    return next('/home')
  } 
  return next()
})

export default router
