import { createRouter, createWebHistory } from 'vue-router'
import { ensureSession, hasAnyRole } from '@/stores/authStore'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresRoles?: string[]
    title?: string
    description?: string
    noindex?: boolean
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
      meta: {
        title: 'BEEP Software | Modern, Scalable Software Solutions',
        description: 'BEEP Software engineers modern, efficient, and scalable solutions for businesses that want to stay ahead of the curve.',
      },
      components: {
        left: () => import('@/views/home/HomeLeft.vue'),
        right: () => import('@/views/home/HomeRight.vue'),
      },
    },
    {
      path: '/contact',
      name: 'Contact',
      meta: {
        title: 'Contact BEEP Software',
        description: 'Get in touch with BEEP Software. Reach us by email or find us in Louisville, Kentucky.',
      },
      components: {
        left: () => import('@/views/contact/ContactLeft.vue'),
        right: () => import('@/views/contact/ContactRight.vue'),
      },
    },
    {
      path: '/admin',
      name: 'Admin',
      meta: {
        requiresAuth: true,
        requiresRoles: ['Admin'],
        title: 'Admin | BEEP Software',
        noindex: true,
      },
      components: {
        left: () => import('@/views/admin/AdminLeft.vue'),
        right: () => import('@/views/admin/AdminRight.vue'),
      },
    },
    {
      path: '/wiki',
      name: 'Wiki',
      meta: {
        requiresAuth: true,
        title: 'Wiki | BEEP Software',
        noindex: true,
      },
      components: {
        left: () => import('@/views/wiki/WikiLeft.vue'),
        right: () => import('@/views/wiki/WikiRight.vue'),
      },
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: 'Sign In | BEEP Software',
        description: 'Sign in to your BEEP Software account to access your dashboard and projects.',
      },
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
