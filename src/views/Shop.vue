<template>
    <div class="shop">
        <ShopFilter />
        <h1 class="display-3 font-weight-light ml-4">Shop</h1>
        <ShopBookList :books="books" />
    </div>
</template>

<script>
import { createNamespacedHelpers, mapMutations } from 'vuex';
import { ACTIVATE_LOADER, DEACTIVATE_LOADER } from '@store/types/mutations';
import { FETCH_INITIAL_BOOKS } from '@store/types/actions';
import ShopBookList from '@components/ShopBookList';
import ShopFilter from '@components/ShopFilter';

const books = createNamespacedHelpers('books');

export default {
    components: {
        ShopBookList,
        ShopFilter
    },
    async created() {
        this[ACTIVATE_LOADER]();

        await this[FETCH_INITIAL_BOOKS]();

        this[DEACTIVATE_LOADER]();
    },
    computed: {
        ...books.mapState({
            books: state => state.books
        })
    },
    methods: {
        ...books.mapActions([
            FETCH_INITIAL_BOOKS
        ]),
        ...mapMutations([
            ACTIVATE_LOADER,
            DEACTIVATE_LOADER
        ])
    }
};
</script>
