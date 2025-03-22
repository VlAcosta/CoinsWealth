import Vue from 'vue'
import Vuex from 'vuex';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/store.js'
import Axios from 'axios'

Vue.use(Vuex);


Vue.config.productionTip = false

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}




new Vue({
  render: (h) => h(App),
  router,
  store
  
}).$mount('#app')
Vue.prototype.$store = store

//console.log(store.state.status);

//console.log(store.stat);

import 'bootstrap/dist/js/bootstrap.js';