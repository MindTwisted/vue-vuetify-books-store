<template>
    <div class="shop">
        <h1>This is a shop page</h1>
        {{ books }}
    </div>
</template>

<script>
import { createNamespacedHelpers, mapMutations } from 'vuex';

const books = createNamespacedHelpers('books');

export default {
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
