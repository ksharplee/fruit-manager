import * as R from 'ramda';
import axios from '@/plugins/axios';
import Vue from 'vue';
import Vuex from 'vuex';
import state from './root/state';
import getters from './root/getters';
import mutations from './root/mutations';
import actions from './root/actions';
import product from './product/index';
import setting from './setting/index';
import customer from './customer/index';
import order from './order/index';

Vue.use(Vuex);

const vm = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions,
  modules: {
    product: {
      namespaced: true,
      state: product.state,
      getters: product.getters,
      mutations: product.mutations,
      actions: product.actions,
    },
    order: {
      namespaced: true,
      state: order.state,
      getters: order.getters,
      mutations: order.mutations,
      actions: order.actions,
    },
    setting: {
      namespaced: true,
      state: setting.state,
      getters: setting.getters,
      mutations: setting.mutations,
      actions: setting.actions,
    },
    customer: {
      namespaced: true,
      state: customer.state,
      getters: customer.getters,
      mutations: customer.mutations,
      actions: customer.actions,
    },
  },
});

vm.$http = axios;
vm.$R = R;

export default vm;
