import { createRouter, createWebHistory } from 'vue-router'
import { ensureSession, hasAnyRole } from '@/stores/authStore'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresRoles?: string[]
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      components: {
        left: () => import('@/views/home/HomeLeft.vue'),
        right: () => import('@/views/home/HomeRight.vue'),
      },
    },
    {
      path: '/contact',
      name: 'Contact',
      components: {
        left: () => import('@/views/contact/ContactLeft.vue'),
        right: () => import('@/views/contact/ContactRight.vue'),
      },
    },
    {
      path: '/admin',
      name: 'Admin',
      meta: { requiresAuth: true, requiresRoles: ['Admin'] },
      components: {
        left: () => import('@/views/admin/AdminLeft.vue'),
        right: () => import('@/views/admin/AdminRight.vue'),
      },
    },
    {
      path: '/wiki',
      name: 'Wiki',
      meta: { requiresAuth: true },
      components: {
        left: () => import('@/views/wiki/WikiLeft.vue'),
        right: () => import('@/views/wiki/WikiRight.vue'),
      },
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        left: () => import('@/views/login/LoginLeft.vue'),
        right: () => import('@/views/login/LoginRight.vue'),
      },
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth && !await ensureSession()) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.requiresRoles && !hasAnyRole(to.meta.requiresRoles)) {
    return { path: '/home' }
  }
})

export default router
