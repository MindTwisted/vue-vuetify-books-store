<template>
    <v-autocomplete
        multiple
        small-chips
        deletable-chips
        clearable
        :label="labelField"
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
    props: {
        fieldName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            items: [],
            isLoading: false,
            search: null
        };
    },
    computed: {
        labelField() {
            const fieldName = this.fieldName;

            return fieldName[0].toUpperCase() + fieldName.slice(1);
        }
    },
    methods: {
        fetchData: debounce(async function(value) {
            this.isLoading = true;

            const fieldName = this.fieldName;
            const response = await api[fieldName].fetch({ search: value });

            this.items = response.data.data[fieldName];
            this.isLoading = false;
        }, 500),
        onSelect(value) {
            const fieldName = this.fieldName;

            this.$emit('setFilters', { [fieldName]: value.join(',') });
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
