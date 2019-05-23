import Vue from 'vue';
import Vuex from 'vuex';
import { ACTIVATE_LOADER, DEACTIVATE_LOADER, SET_NOTIFICATION } from '@store/mutation-types';
import books from '@store/modules/books';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        isLoading: false,
        notification: {
            message: {}
        }
    },
    mutations: {
        [ACTIVATE_LOADER](state) {
            state.isLoading = true;
        },
        [DEACTIVATE_LOADER](state) {
            state.isLoading = false;
        },
        [SET_NOTIFICATION](state, payload) {
            state.notification = {
                ...state.notification,
                ...payload.notification
            };
        }
    },
    actions: {
        activateLoader({ commit }) {
            commit(ACTIVATE_LOADER);
        },
        deactivateLoader({ commit }) {
            commit(DEACTIVATE_LOADER);
        },
        setNotification({ commit }, notification) {
            commit(SET_NOTIFICATION, { notification });
        }
    },
    modules: {
        books
    }
});
