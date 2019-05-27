import Vue from 'vue';
import Vuex from 'vuex';
import { ACTIVATE_LOADER, DEACTIVATE_LOADER, SET_NOTIFICATION, REMOVE_NOTIFICATION } from '@store/mutation-types';
import books from '@store/modules/books';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        isLoading: false,
        notification: {
            messages: []
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
            state.notification.messages = [
                ...state.notification.messages,
                payload.message
            ];
        },
        [REMOVE_NOTIFICATION](state, payload) {
            state.notification.messages = state.notification.messages.filter(message => message.id !== payload.id);
        }
    },
    actions: {
        activateLoader({ commit }) {
            commit(ACTIVATE_LOADER);
        },
        deactivateLoader({ commit }) {
            commit(DEACTIVATE_LOADER);
        },
        setNotification({ commit }, message) {
            const id = `f${(Date.now()).toString(16)}`;

            message.id = id;

            commit(SET_NOTIFICATION, { message });

            setTimeout(() => {
                commit(REMOVE_NOTIFICATION, { id });
            }, 2000);
        }
    },
    modules: {
        books
    }
});
