import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false;
// FIXME: fix url for production
axios.defaults.baseURL = 'http://localhost:10080/api';

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
