import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/workspace/:templateCode',
    name: 'workspace',
    component: () => import('@/views/WorkspaceView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/my-templates',
    name: 'myTemplates',
    component: () => import('@/views/MyTemplatesView.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/HistoryView.vue')
  },
  {
    path: '/vip',
    name: 'vip',
    component: () => import('@/views/VipView.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

