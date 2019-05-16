import api from '@api';
import { FILL } from '@store/types/mutations';

const books = {
    namespaced: true,
    state: {
        books: []
    },
    mutations: {
        [FILL](state, payload) {
            state.books = payload.books;
        }
    },
    actions: {
        async fetch({ commit }) {
            const response = await api.books.fetch();

            commit(FILL, response.data.data);
        }
    }
};

export default books;
