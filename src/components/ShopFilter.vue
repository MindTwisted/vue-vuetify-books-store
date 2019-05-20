<template>
    <div class="shopFilter">
        <ShopFilterOpenButton @showPanel="isVisible = true" />
        <v-navigation-drawer
            v-model="isVisible"
            fixed
            temporary
        >
            <ShopFilterPanel
                v-bind="bookFilters"
                @setFilters="setFilters"
                @submitFilters="submitFilters"
                @clearFilters="clearFilters"
            />
        </v-navigation-drawer>
    </div>
</template>

<script>
import ShopFilterOpenButton from '@components/ShopFilterOpenButton';
import ShopFilterPanel from '@components/ShopFilterPanel';

export default {
    components: {
        ShopFilterOpenButton,
        ShopFilterPanel
    },
    data() {
        return {
            isVisible: false,
            bookFilters: {
                search: ''
            }
        };
    },
    methods: {
        setFilters({ search }) {
            this.bookFilters = {
                search
            };
        },
        submitFilters() {
            this.$emit('submitFilters', this.bookFilters);
        },
        clearFilters() {
            this.bookFilters = {
                search: ''
            };

            this.$emit('submitFilters', this.bookFilters);
        }
    }
};
</script>
