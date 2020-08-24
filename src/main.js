import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import store from './store'
import VueGtag from "vue-gtag";

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

Vue.use(VueGtag, {
    config: {id: process.env.VUE_APP_GA_TRACKING_ID}
});

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
