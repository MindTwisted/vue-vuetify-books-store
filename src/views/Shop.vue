<template>
    <div class="shop">
        <ShopFilter
            v-bind="filters"
            @setFilters="setFilters"
            @submitFilters="submitFilters"
            @clearFilters="clearFilters"
        />
        <h1 class="display-3 font-weight-light ml-4">Shop</h1>
        <ShopBookList
            :books="books"
            @setAndSubmitFilters="setAndSubmitFilters"
        />
        <div
            v-if="canLoadMore"
            class="text-xs-center mt-3"
        >
            <LoadMoreButton @loadMore="fetchAppendBooks" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import api from '@api';
import ShopBookList from '@components/ShopBookList';
import ShopFilter from '@components/ShopFilter';
import LoadMoreButton from '@components/LoadMoreButton';

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
    components: {
        ShopBookList,
        ShopFilter,
        LoadMoreButton
    },
    data() {
        return {
            ...initialState
        };
    },
    async created() {
        await this.fetchReplaceBooks();
    },
    computed: {
        canLoadMore() {
            return this.books.length >= 50 &&
                !this.navigation.isFinished;
        },
        isFiltersSet() {
            return Boolean(this.filters.search ||
                this.filters.authors ||
                this.filters.genres);
        }
    },
    methods: {
        ...mapActions([
            'activateLoader',
            'deactivateLoader'
        ]),
        async fetchReplaceBooks() {
            this.activateLoader();

            const response = await api.books.fetch(this.filters);

            this.books = response.data.data.books;
            this.filters.isFiltersApplied = this.isFiltersSet;
            this.deactivateLoader();
        },
        async fetchAppendBooks() {
            this.navigation.offset += 50;
            this.activateLoader();

            const response = await api.books.fetch({ ...this.filters, ...this.navigation });
            const newBooks = response.data.data.books;

            if (newBooks.length < 50) {
                this.navigation.isFinished = true;
            }

            this.books = [...this.books, ...newBooks];
            this.deactivateLoader();
        },
        setFilters(filters) {
            if (filters.rawAuthors) {
                filters.authors = filters.rawAuthors.map(item => item._id).join(',');
            }

            if (filters.rawGenres) {
                filters.genres = filters.rawGenres.map(item => item._id).join(',');
            }

            this.filters = {
                ...this.filters,
                ...filters
            };
        },
        resetFilters() {
            this.filters = { ...initialState.filters };
        },
        resetNavigation() {
            this.navigation = { ...initialState.navigation };
        },
        submitFilters() {
            this.resetNavigation();
            this.fetchReplaceBooks();
        },
        setAndSubmitFilters(filters) {
            this.resetFilters();
            this.setFilters(filters);
            this.submitFilters();
        },
        clearFilters() {
            this.resetFilters();
            this.resetNavigation();
            this.fetchReplaceBooks();
        }
    }
};
</script>
