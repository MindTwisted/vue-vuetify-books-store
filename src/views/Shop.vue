<template>
    <div class="shop">
        <h1>This is a shop page</h1>
        {{ books }}
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const books = createNamespacedHelpers('books');

export default {
    async created() {
        await this.fetchBooks();
    },
    computed: {
        ...books.mapState({
            books: state => state.books
        })
    },
    methods: {
        ...books.mapActions({
            fetchBooks: 'fetch'
        })
    }
};
</script>
