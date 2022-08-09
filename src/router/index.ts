import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store';

Vue.use(VueRouter);

import HomeView from '@/views/Home.vue';
import AdminView from '@/views/Admin.vue';
import AdminLoginView from '@/views/AdminLogin.vue';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/login',
    name: 'login',
    component: AdminLoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let isLoggedIn: Boolean = store.getters['LoginModule/isLoggedIn'];

    if (!isLoggedIn) {
      // verify if the user might be logged in anyways for page refresh..
      isLoggedIn = (await store.dispatch('LoginModule/login'));
    }

    if (!isLoggedIn) {
      next({ name: 'login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next()
  }
  next();
})

export default router
