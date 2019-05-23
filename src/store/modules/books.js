import api from '@api';
import {
    ACTIVATE_LOADER,
    DEACTIVATE_LOADER,
    SET_FILTERS,
    RESET_FILTERS,
    SET_NAVIGATION,
    RESET_NAVIGATION,
    REPLACE_DATA,
    APPEND_DATA
} from '@store/mutation-types';

const initialState = {
    books: [],
    filters: {
        isFiltersApplied: false,
        search: '',
        authors: '',
        rawAuthors: [],
        genres: '',
        rawGenres: []
    },
    navigation: {
        isFinished: false,
        offset: 0
    }
};

export default {
    namespaced: true,
    state: {
        ...initialState
    },
    mutations: {
        [REPLACE_DATA](state, payload) {
            state.books = payload.books;
        },
        [APPEND_DATA](state, payload) {
            state.books = [...state.books, ...payload.books];
        },
        [SET_FILTERS](state, payload) {
            const filters = payload.filters;

            if (filters.rawAuthors) {
                filters.authors = filters.rawAuthors.map(item => item._id).join(',');
            }

            if (filters.rawGenres) {
                filters.genres = filters.rawGenres.map(item => item._id).join(',');
            }

            state.filters = {
                ...state.filters,
                ...filters
            };
        },
        [SET_NAVIGATION](state, payload) {
            state.navigation = {
                ...state.navigation,
                ...payload.navigation
            };
        },
        [RESET_FILTERS](state) {
            state.filters = { ...initialState.filters };
        },
        [RESET_NAVIGATION](state) {
            state.navigation = { ...initialState.navigation };
        }
    },
    actions: {
        async fetchReplaceBooks({ commit, state, getters }) {
            commit(ACTIVATE_LOADER, null, { root: true });

            const response = await api.books.fetch(state.filters);
            const newBooks = response.data.data.books;

            commit(REPLACE_DATA, { books: newBooks });
            commit(SET_FILTERS, {
                filters: {
                    isFiltersApplied: getters.isFiltersSet
                }
            });
            commit(RESET_NAVIGATION);
            commit(DEACTIVATE_LOADER, null, { root: true });
        },
        async fetchAppendBooks({ commit, state }) {
            commit(SET_NAVIGATION, {
                navigation: {
                    offset: state.navigation.offset + 50
                }
            });
            commit(ACTIVATE_LOADER, null, { root: true });

            const response = await api.books.fetch({ ...state.filters, ...state.navigation });
            const newBooks = response.data.data.books;

            if (newBooks.length < 50) {
                commit(SET_NAVIGATION, {
                    navigation: {
                        isFinished: true
                    }
                });
            }

            commit(APPEND_DATA, { books: newBooks });
            commit(DEACTIVATE_LOADER, null, { root: true });
        },
        setFilters({ commit }, filters) {
            commit(SET_FILTERS, { filters });
        },
        resetFilters({ commit }) {
            commit(RESET_FILTERS);
        },
        setAndSubmitFilters({ dispatch, commit }, filters) {
            commit(RESET_FILTERS);
            commit(SET_FILTERS, { filters });

            dispatch('fetchReplaceBooks');
        },
        clearFilters({ dispatch, commit }) {
            commit(RESET_FILTERS);

            dispatch('fetchReplaceBooks');
        }
    },
    getters: {
        isAbleLoadMore(state) {
            return state.books.length >= 50 &&
                !state.navigation.isFinished;
        },
        isFiltersSet(state) {
            return Boolean(state.filters.search ||
                state.filters.authors ||
                state.filters.genres);
        },
        getBookById: (state) => (id) => {
            return state.books.find(book => book._id === id);
        }
    }
};
