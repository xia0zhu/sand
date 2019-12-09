// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

import {post,get,patch,put} from './api/https'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
import axios from 'axios'
axios.defaults.withCredentials =true;
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
