import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import './styles/custom.scss';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // 若不存在用户信息且不是前往登录页面
  if (!store.state.user && to.name !== 'Login') {
    if (sessionStorage.getItem('user')) {
      store.commit('SET_USER', JSON.parse(sessionStorage.getItem('user')));
      next();
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
