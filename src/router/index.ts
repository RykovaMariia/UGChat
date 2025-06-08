import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { routeNames } from './route-names';
import { authService } from '@/services/auth.service';

const authGuard: RouteRecordRaw['beforeEnter'] = function (to, from, next) {
  if (!authService.isAuthorized()) {
    console.log('ghfhg');
    next({ name: routeNames.login });
  } else {
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: routeNames.chat },
  },
  {
    path: '/chat',
    name: routeNames.chat,
    component: () => import('@/views/pages/ChatPage.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/login',
    name: routeNames.login,
    component: () => import('@/views/pages/Login/LoginPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
