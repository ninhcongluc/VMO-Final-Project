import { createWebHistory, createRouter } from 'vue-router';

import Login from './components/Login.vue';
import Home from './components/Home.vue';
import ResetPassword from './components/ResetPassword.vue';
import ChangePassword from './components/ChangePassword.vue';
import Admin from './components/admin/Admin.vue';
import Member from './components/admin/Member.vue';
import MemberInfo from './components/admin/MemberInfo.vue';
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
  {
    path: '/admin_manager',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/admin_manager/members',
    name: 'Member',
    component: Member,
  },
  {
    path: '/admin_manager/members/:id',
    name: 'MemberInfo',
    component: MemberInfo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
