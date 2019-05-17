<template>
    <div class="shop">
        <h1 class="display-3 font-weight-light ml-4">Shop</h1>
        <ShopBookList :books="books" />
    </div>
</template>

<script>
import { createNamespacedHelpers, mapMutations } from 'vuex';
import ShopBookList from '@components/ShopBookList';

const books = createNamespacedHelpers('books');

export default {
    components: {
        ShopBookList
    },
    async created() {
        this.activateLoader();

        await this.fetchBooks();

        this.deactivateLoader();
    },
    computed: {
        ...books.mapState({
            books: state => state.books
        })
    },
    methods: {
        ...books.mapActions({
            fetchBooks: 'fetch'
        }),
        ...mapMutations([
            'activateLoader',
            'deactivateLoader'
        ])
    }
};
</script>
