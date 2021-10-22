import { createWebHistory, createRouter } from 'vue-router';

import Login from './components/Login.vue';
import Home from './components/Home.vue';
import ResetPassword from './components/ResetPassword.vue';
import ChangePassword from './components/ChangePassword.vue';
import Admin from './components/admin/Admin.vue';
import Member from './components/admin/Member.vue';
import MemberInfo from './components/admin/MemberInfo.vue';
import CreateMember from './components/member/CreateMember.vue';
import Technology from './components/admin/Technology.vue';
import Manager from './components/manager/Manager.vue';
import Employee from './components/employee/Employee.vue';
import NotFound from './components/NotFound.vue';
import Unit from './components/admin/Unit.vue';
import Project from './components/admin/Project.vue';

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
  {
    path: '/admin_manager/members/create',
    name: 'CreateMember',
    component: CreateMember,
  },
  {
    path: '/admin_manager/technologies',
    name: 'Technology',
    component: Technology,
  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager,
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee,
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/admin_manager/units',
    name: 'Unit',
    component: Unit,
  },
  {
    path: '/admin_manager/projects',
    name: 'Project',
    component: Project,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
