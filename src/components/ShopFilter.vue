<template>
    <div class="shopFilter">
        <ShopFilterOpenButton
            :isFiltersApplied="filters.isFiltersApplied"
            @showPanel="isVisible = true"
        />
        <v-navigation-drawer
            v-model="isVisible"
            fixed
            temporary
        >
            <ShopFilterPanel
                :search="filters.search"
                :rawAuthors="filters.rawAuthors"
                :rawGenres="filters.rawGenres"
                @setFilters="setFilters($event)"
                @submitFilters="fetchReplaceBooks"
                @clearFilters="clearFilters"
            />
        </v-navigation-drawer>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ShopFilterOpenButton from '@components/ShopFilterOpenButton';
import ShopFilterPanel from '@components/ShopFilterPanel';

const books = createNamespacedHelpers('books');

export default {
    components: {
        ShopFilterOpenButton,
        ShopFilterPanel
    },
    data() {
        return {
            isVisible: false
        };
    },
    computed: {
        ...books.mapState([
            'filters'
        ])
    },
    methods: {
        ...books.mapActions([
            'setFilters',
            'fetchReplaceBooks',
            'clearFilters'
        ])
    }
};
</script>
