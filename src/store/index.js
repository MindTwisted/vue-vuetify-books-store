import Vue from 'vue';
import Vuex from 'vuex';
import {
    ACTIVATE_LOADER,
    DEACTIVATE_LOADER,
    SET_NOTIFICATION,
    REMOVE_NOTIFICATION,
    SET_AUTH,
    REMOVE_AUTH
} from '@store/mutation-types';
import books from '@store/modules/books';
import api from '@api';

Vue.use(Vuex);

const initialState = {
    isLoading: false,
    notification: {
        messages: []
    },
    auth: {
        id: '',
        token: '',
        name: '',
        email: '',
        role: ''
    }
};

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        ...initialState,
        auth: {
            id: localStorage.getItem('id') || '',
            token: localStorage.getItem('token') || '',
            name: localStorage.getItem('name') || '',
            email: localStorage.getItem('email') || '',
            role: localStorage.getItem('role') || ''
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
        },
        [SET_AUTH](state, payload) {
            state.auth = payload.auth;
        },
        [REMOVE_AUTH](state) {
            state.auth = { ...initialState.auth };
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
        },
        setAuth({ commit }, data) {
            localStorage.setItem('id', data.id);
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            localStorage.setItem('role', data.role);

            commit(SET_AUTH, { auth: data });
        },
        removeAuth({ commit }) {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('role');

            commit(REMOVE_AUTH);
        },
        async registerUser({ commit, dispatch }, userData) {
            commit(ACTIVATE_LOADER);

            const response = await api.auth.register(userData);

            if (!response) {
                commit(DEACTIVATE_LOADER);

                return;
            }

            if (response.data.status !== 'success') {
                commit(DEACTIVATE_LOADER);

                return response;
            }

            const data = response.data;

            dispatch('setNotification', { text: data.text, type: 'success' });

            await dispatch('loginUser', userData);

            commit(DEACTIVATE_LOADER);

            return response;
        },
        async loginUser({ commit, dispatch }, credentials) {
            commit(ACTIVATE_LOADER);

            const response = await api.auth.login(credentials);

            if (!response ||
                response.data.status === 'failed') {
                commit(DEACTIVATE_LOADER);

                return;
            }

            const data = response.data;

            dispatch('setNotification', { text: data.text, type: 'success' });
            dispatch('setAuth', {
                id: data.data.user._id,
                token: data.data.token,
                name: data.data.user.name,
                email: data.data.user.email,
                role: data.data.user.role
            });
            commit(DEACTIVATE_LOADER);

            return response;
        },
        logoutUser({ dispatch }) {
            dispatch('removeAuth');
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.auth.id &&
                state.auth.token &&
                state.auth.name &&
                state.auth.email &&
                state.auth.role;
        }
    },
    modules: {
        books
    }
});
