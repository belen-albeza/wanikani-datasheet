import Vue from 'vue';
import VueRouter from 'vue-router';
import DataSheet from './views/DataSheet.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'datasheet',
    component: DataSheet,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
