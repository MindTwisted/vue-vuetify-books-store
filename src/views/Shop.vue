<template>
    <div class="shop">
        <ShopFilter
            v-bind="bookFilters"
            @setFilters="setFilters"
            @submitFilters="submitFilters"
            @clearFilters="clearFilters"
        />
        <h1 class="display-3 font-weight-light ml-4">Shop</h1>
        <ShopBookList :books="books" />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import api from '@api';
import ShopBookList from '@components/ShopBookList';
import ShopFilter from '@components/ShopFilter';

export default {
    components: {
        ShopBookList,
        ShopFilter
    },
    data() {
        return {
            books: [],
            bookFilters: {
                search: ''
            }
        };
    },
    async created() {
        await this.fetchReplaceBooks();
    },
    methods: {
        ...mapActions([
            'activateLoader',
            'deactivateLoader'
        ]),
        async fetchReplaceBooks() {
            this.activateLoader();

            const response = await api.books.fetch(this.bookFilters);

            this.books = response.data.data.books;

            this.deactivateLoader();
        },
        setFilters({ search }) {
            this.bookFilters = {
                search
            };
        },
        submitFilters() {
            this.fetchReplaceBooks();
        },
        clearFilters() {
            this.bookFilters = {
                search: ''
            };

            this.fetchReplaceBooks();
        }
    }
};
</script>
