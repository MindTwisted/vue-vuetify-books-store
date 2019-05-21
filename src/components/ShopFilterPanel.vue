<template>
    <div class="shopFilterPanel">
        <v-toolbar flat>
            <v-list>
                <v-list-tile>
                    <v-list-tile-title class="title font-weight-light">
                        Filters
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <form
            class="shopFilterPanel__form"
            @submit.prevent="submitFilters">
            <v-text-field
                v-model="searchFilter"
                label="Search"
                clearable
            ></v-text-field>

            <ShopFilterPanelAuthors @setFilters="$emit('setFilters', $event)" />
            <ShopFilterPanelGenres @setFilters="$emit('setFilters', $event)" />

            <v-btn
                block
                color="success"
                @click="$emit('submitFilters')"
            >
                <v-icon>find_replace</v-icon>
            </v-btn>
        </form>
    </div>
</template>

<script>
import ShopFilterPanelAuthors from '@components/ShopFilterPanelAuthors';
import ShopFilterPanelGenres from '@components/ShopFilterPanelGenres';

export default {
    components: {
        ShopFilterPanelAuthors,
        ShopFilterPanelGenres
    },
    props: {
        search: {
            type: String,
            required: true
        }
    },
    computed: {
        searchFilter: {
            get() {
                return this.search;
            },
            set(value) {
                value = (value && value.trim()) || '';

                this.$emit('setFilters', { search: value });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.shopFilterPanel {
    &__form {
        padding: 0.75rem;
    }
}
</style>
