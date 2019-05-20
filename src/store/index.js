import Vue from 'vue';
import Vuex from 'vuex';
import { ACTIVATE_LOADER, DEACTIVATE_LOADER } from '@store/types/mutations';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        isLoading: false
    },
    mutations: {
        [ACTIVATE_LOADER](state) {
            state.isLoading = true;
        },
        [DEACTIVATE_LOADER](state) {
            state.isLoading = false;
        }
    },
    actions: {
        activateLoader({ commit }) {
            commit(ACTIVATE_LOADER);
        },
        deactivateLoader({ commit }) {
            commit(DEACTIVATE_LOADER);
        }
    }
});
