<template>
    <div>
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
            class="filtersForm"
            @submit.prevent="submitFilters">
            <v-text-field
                v-model="searchFilter"
                label="Search"
                clearable
            ></v-text-field>

            <ShopFilterPanelAutocomplete
                @setFilters="$emit('setFilters', $event)"
                fieldName="authors"
                :rawData="rawAuthors"
            />
            <ShopFilterPanelAutocomplete
                @setFilters="$emit('setFilters', $event)"
                fieldName="genres"
                :rawData="rawGenres"
            />

            <div class="formButtons">
                <v-btn
                    block
                    color="success"
                    @click="$emit('submitFilters')"
                >
                    <v-icon>find_replace</v-icon>
                </v-btn>

                <v-btn
                    block
                    color="error"
                    @click="$emit('clearFilters')"
                >
                    <v-icon>clear</v-icon>
                </v-btn>
            </div>
        </form>
    </div>
</template>

<script>
import ShopFilterPanelAutocomplete from '@components/ShopFilterPanelAutocomplete';

export default {
    components: {
        ShopFilterPanelAutocomplete
    },
    props: {
        search: {
            type: String,
            required: true
        },
        rawAuthors: {
            type: Array,
            required: true
        },
        rawGenres: {
            type: Array,
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
.filtersForm {
    padding: 0.75rem;
}

.formButtons {
    display: flex;

    & > * {
        margin: 0 0.35rem;
    }
}
</style>
