<template>
    <div class="shop">
        <ShopFilter />
        <h1 class="display-3 font-weight-light">Shop</h1>
        <v-breadcrumbs
            large
            light
            :items="items"
        >
            <template v-slot:divider>
                <v-icon>arrow_forward</v-icon>
            </template>
        </v-breadcrumbs>
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
    data() {
        return {
            items: [
                {
                    text: 'Home',
                    disabled: false,
                    to: '/'
                },
                {
                    text: 'Shop',
                    disabled: true,
                    to: 'shop'
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
