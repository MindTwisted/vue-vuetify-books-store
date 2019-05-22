<template>
    <div class="shop">
        <ShopFilter />
        <h1 class="display-3 font-weight-light ml-4">Shop</h1>
        <ShopBookList />
        <div
            v-if="isAbleLoadMore"
            class="text-xs-center mt-3"
        >
            <LoadMoreButton @loadMore="fetchAppendBooks" />
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ShopBookList from '@components/ShopBookList';
import ShopFilter from '@components/ShopFilter';
import LoadMoreButton from '@components/LoadMoreButton';

const books = createNamespacedHelpers('books');

export default {
    components: {
        ShopBookList,
        ShopFilter,
        LoadMoreButton
    },
    created() {
        this.resetFilters();
        this.fetchReplaceBooks();
    },
    computed: {
        ...books.mapGetters([
            'isAbleLoadMore'
        ])
    },
    methods: {
        ...books.mapActions([
            'fetchReplaceBooks',
            'fetchAppendBooks',
            'resetFilters'
        ])
    }
};
</script>
