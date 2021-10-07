import { createWebHistory, createRouter } from 'vue-router';

import Login from './components/Login.vue';
import Home from './components/Home.vue';
import ResetPassword from './components/ResetPassword.vue';
import ChangePassword from './components/ChangePassword.vue';
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/password_reset',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/password_reset/:token',
    name: 'ChangePassword',
    component: ChangePassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
