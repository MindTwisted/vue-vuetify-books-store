<template>
    <div class="shop">
        <ShopFilter
            v-bind="filters"
            @setFilters="setFilters"
            @submitFilters="submitFilters"
            @clearFilters="clearFilters"
        />
        <h1 class="display-3 font-weight-light ml-4">Shop</h1>
        <ShopBookList :books="books" />
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
        }
    },
    watch: {
        filters: {
            handler(value) {
                this.filters.authors = value.rawAuthors.map(item => item._id).join(',');
                this.filters.genres = value.rawGenres.map(item => item._id).join(',');
            }
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
        clearFilters() {
            this.resetFilters();
            this.resetNavigation();
            this.fetchReplaceBooks();
        }
    }
};
</script>
