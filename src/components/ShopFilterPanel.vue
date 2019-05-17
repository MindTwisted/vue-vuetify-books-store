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

        <v-list>
            <form @submit.prevent="submitFilter">
                <v-list-tile>
                    <v-text-field
                        :value="filters.search"
                        @input="updateFilterSearch"
                        label="Search"
                    ></v-text-field>
                </v-list-tile>

                <v-list-tile>
                    <v-btn
                        color="success"
                        @click="submitFilter"
                    >
                        Submit
                    </v-btn>

                    <v-btn
                        color="error"
                        @click="resetFilter"
                    >
                        Reset
                    </v-btn>
                </v-list-tile>
            </form>
        </v-list>
    </div>
</template>

<script>
import { createNamespacedHelpers, mapMutations } from 'vuex';
import { UPDATE_FILTER_SEARCH, RESET_FILTER, ACTIVATE_LOADER, DEACTIVATE_LOADER } from '@store/types/mutations';
import { FETCH_INITIAL_BOOKS } from '@store/types/actions';

const books = createNamespacedHelpers('books');

export default {
    computed: {
        ...books.mapState({
            filters: state => state.filters
        })
    },
    methods: {
        ...mapMutations([
            ACTIVATE_LOADER,
            DEACTIVATE_LOADER
        ]),
        ...books.mapMutations([
            UPDATE_FILTER_SEARCH,
            RESET_FILTER
        ]),
        ...books.mapActions([
            FETCH_INITIAL_BOOKS
        ]),
        updateFilterSearch(value) {
            this[UPDATE_FILTER_SEARCH]({ search: value.trim() });
        },
        async submitFilter() {
            this[ACTIVATE_LOADER]();

            await this[FETCH_INITIAL_BOOKS]();

            this[DEACTIVATE_LOADER]();
        },
        async resetFilter() {
            this[RESET_FILTER]();
            this[ACTIVATE_LOADER]();

            await this[FETCH_INITIAL_BOOKS]();

            this[DEACTIVATE_LOADER]();
        }
    }
};
</script>
