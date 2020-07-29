import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Dashboard,
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
      {
        path: '/goods',
        name: 'GoodsList',
        component: () => import(/* webpackChunkName: "goods" */ '../views/GoodsList.vue'),
      },
      {
        path: '/goods/add',
        name: 'GoodsAdd',
        component: () => import(/* webpackChunkName: "goods" */ '../views/GoodsOperation.vue'),
      },
      {
        path: '/goods/edit/:id',
        name: 'GoodsEdit',
        component: () => import(/* webpackChunkName: "goods" */ '../views/GoodsOperation.vue'),
        props: true,
      },
      {
        path: '/goods-category',
        name: 'GoodsCategory',
        component: () => import(/* webpackChunkName: "goods" */ '../views/GoodsCategory.vue'),
      },
      {
        path: '/goods-unit',
        name: 'GoodsUnit',
        component: () => import(/* webpackChunkName: "goods" */ '../views/GoodsUnit.vue'),
      },
      {
        path: '/setting-ad',
        name: 'SettingAd',
        component: () => import(/* webpackChunkName: "setting" */ '../views/SettingAd.vue'),
      },
      {
        path: '/setting-notice',
        name: 'SettingNotice',
        component: () => import(/* webpackChunkName: "setting" */ '../views/SettingNotice.vue'),
      },
      {
        path: '/setting-notice/:id',
        name: 'SettingNoticeOperation',
        component: () => import(/* webpackChunkName: "setting" */ '../views/SettingNoticeOperation.vue'),
        props: true,
      },
      {
        path: '/setting-promotion',
        name: 'SettingPromotion',
        component: () => import(/* webpackChunkName: "setting" */ '../views/SettingPromotion.vue'),
      },
      {
        path: '/setting-promotion/add',
        name: 'SettingPromotionAdd',
        component: () => import(/* webpackChunkName: "setting" */ '../views/SettingPromotionOperation.vue'),
      },
      {
        path: '/setting-promotion/edit/:id',
        name: 'SettingPromotionEdit',
        component: () => import(/* webpackChunkName: "setting" */ '../views/SettingPromotionOperation.vue'),
        props: true,
      },
      {
        path: '/customer-list',
        name: 'CustomerList',
        component: () => import(/* webpackChunkName: "customer" */ '../views/CustomerList.vue'),
      },
      {
        path: '*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

export default router;
