import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { routeNames } from './route-names';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: routeNames.chat },
  },
  {
    path: '/chat',
    name: routeNames.chat,
    component: () => import('@/views/pages/ChatPage.vue'),
  },
  {
    path: '/login',
    name: routeNames.login,
    component: () => import('@/views/pages/LoginPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
