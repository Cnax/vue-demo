import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';

import './assets/styles/global.styl';
import CreateRouter from './config/router';
import createStore from './store';

Vue.use(Vuex);
Vue.use(VueRouter);

const router = CreateRouter();
const store = createStore();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#root');
