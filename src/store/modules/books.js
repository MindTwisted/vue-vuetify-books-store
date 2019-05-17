import api from '@api';
import { FILL_BOOKS, UPDATE_FILTER_SEARCH, RESET_FILTER } from '@store/types/mutations';
import { FETCH_INITIAL_BOOKS } from '@store/types/actions';

const books = {
    namespaced: true,
    state: {
        books: [],
        filters: {
            search: ''
        }
    },
    mutations: {
        [FILL_BOOKS](state, payload) {
            state.books = payload.books;
        },
        [UPDATE_FILTER_SEARCH](state, payload) {
            state.filters.search = payload.search;
        },
        [RESET_FILTER](state) {
            state.filters = {
                search: ''
            };
        }
    },
    actions: {
        async [FETCH_INITIAL_BOOKS]({ commit, state }) {
            const response = await api.books.fetch(state.filters);

            commit(FILL_BOOKS, response.data.data);
        }
    }
};

export default books;
