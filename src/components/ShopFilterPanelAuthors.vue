<template>
    <v-autocomplete
        multiple
        small-chips
        deletable-chips
        clearable
        label="Authors"
        :loading="isLoading"
        :disabled="isLoading"
        :items="items"
        :search-input.sync="search"
        item-text="name"
        item-value="_id"
        cache-items
        hide-no-data
        @change="onSelect"
    ></v-autocomplete>
</template>

<script>
import { debounce } from 'lodash';
import api from '@api';

export default {
    data() {
        return {
            items: [],
            isLoading: false,
            search: null
        };
    },
    methods: {
        fetchData: debounce(async function(value) {
            this.isLoading = true;

            const response = await api.authors.fetch({ search: value });

            this.items = response.data.data.authors;
            this.isLoading = false;
        }, 500),
        onSelect(value) {
            this.$emit('setFilters', { authors: value.join(',') });
        }
    },
    watch: {
        search(value) {
            if (!value) {
                return;
            }

            this.fetchData(value);
        }
    }
};
</script>
