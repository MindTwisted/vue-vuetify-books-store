import api from '@api';

const books = {
    namespaced: true,
    state: {
        books: []
    },
    mutations: {
        fill(state, payload) {
            state.books = payload.books;
        }
    },
    actions: {
        async fetch({ commit }) {
            const response = await api.books.fetch();

            commit('fill', response.data.data);
        }
    }
};

export default books;
