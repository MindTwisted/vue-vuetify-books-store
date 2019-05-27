import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/';
import { priceWithDiscount, formatPrice, avatarName } from '@utils/filters';

Vue.config.productionTip = false;

Vue.filter('priceWithDiscount', priceWithDiscount);
Vue.filter('formatPrice', formatPrice);
Vue.filter('avatarName', avatarName);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
