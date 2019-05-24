<template>
    <div>
        <ShopFilter />
        <h1 class="display-3 font-weight-light">Shop</h1>
        <Breadcrumbs :items="breadcrumbs" />
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
import Breadcrumbs from '@components/Breadcrumbs';

const books = createNamespacedHelpers('books');

export default {
    components: {
        ShopBookList,
        ShopFilter,
        LoadMoreButton,
        Breadcrumbs
    },
    data() {
        return {
            breadcrumbs: [
                {
                    text: 'Home',
                    disabled: false,
                    to: { name: 'home' },
                    exact: true
                },
                {
                    text: 'Shop',
                    disabled: true
                }
            ]
        };
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
