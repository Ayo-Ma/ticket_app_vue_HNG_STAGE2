import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/pages/Landing.vue')
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: () => import('@/pages/Signup.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard.vue'),
    meta: { requiresAuth: true } // Protected route
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: () => import('@/pages/Tickets.vue'),
    meta: { requiresAuth: true } // Protected route
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.user) {
    // Redirect to login if route requires auth and user is not logged in
    next({ name: 'Login', replace: true });
  } else {
    next();
  }
});

export default router;