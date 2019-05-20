<template>
    <div class="shop">
        <ShopFilter @submitFilters="fetchReplaceBooks" />
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
            books: []
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
        async fetchReplaceBooks(filters = {}) {
            this.activateLoader();

            const response = await api.books.fetch(filters);

            this.books = response.data.data.books;

            this.deactivateLoader();
        }
    }
};
</script>
