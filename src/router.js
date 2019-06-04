import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import PageNotFound from './views/PageNotFound.vue';
import store from '@store';

Vue.use(Router);

const isLoggedIn = (to, from, next) => {
    if (!store.getters.isLoggedIn) {
        return next({ name: 'home' });
    }

    return next();
};

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/shop',
            name: 'shop',
            component: () => import('./views/Shop.vue')
        },
        {
            path: '/shop/:id',
            name: 'shopDetails',
            component: () => import('./views/ShopDetails.vue')
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('./views/Cart.vue'),
            beforeEnter: isLoggedIn
        },
        {
            path: '*',
            name: 'pageNotFound',
            component: PageNotFound
        }
    ]
});
