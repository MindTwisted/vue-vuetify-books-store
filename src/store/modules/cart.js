import api from '@api';
import {
    ACTIVATE_LOADER,
    DEACTIVATE_LOADER,
    REPLACE_DATA,
    APPEND_DATA
} from '@store/mutation-types';

const initialState = {
    cart: []
};

export default {
    namespaced: true,
    state: {
        ...initialState
    },
    mutations: {
        [REPLACE_DATA](state, payload) {
            state.cart = payload.cart;
        },
        [APPEND_DATA](state, payload) {
            state.cart = [ ...state.cart, payload.cart ];
        }
    },
    actions: {
        async fetchCart({ commit }) {
            commit(ACTIVATE_LOADER, null, { root: true });

            const response = await api.cart.fetchCart();

            let cart;
            const data = response.data;

            try {
                cart = data.data.cart;
            } catch (e) {
                cart = [];
            }

            commit(REPLACE_DATA, { cart });
            commit(DEACTIVATE_LOADER, null, { root: true });

            return response;
        },
        async addToCart({ commit, dispatch }, cartData) {
            const response = await api.cart.addToCart(cartData);

            if (!response ||
                response.data.status !== 'success') {
                commit(DEACTIVATE_LOADER, null, { root: true });

                return response;
            }

            const data = response.data;
            const cart = data.data.cart;

            commit(APPEND_DATA, { cart });
            dispatch('setNotification', { text: data.text, type: 'success' }, { root: true });

            return response;
        },
        cleanCart({ commit }) {
            commit(REPLACE_DATA, { cart: initialState.cart });
        }
    },
    getters: {
        cartItemsCount(state) {
            return state.cart.length;
        },
        isInCart: (state) => (id) => {
            const cartItem = state.cart.find(item => item.book._id === id);

            return Boolean(cartItem);
        }
    }
};
