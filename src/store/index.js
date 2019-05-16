import Vue from 'vue';
import Vuex from 'vuex';
import books from '@store/modules/books';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        isLoading: false
    },
    mutations: {
        activateLoader(state) {
            state.isLoading = true;
        },
        deactivateLoader(state) {
            state.isLoading = false;
        }
    },
    actions: {},
    modules: {
        books
    }
});
