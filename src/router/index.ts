import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store';

Vue.use(VueRouter);

import HomeView from '@/views/Home.vue';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router
