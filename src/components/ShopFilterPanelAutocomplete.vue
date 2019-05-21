<template>
    <v-autocomplete
        multiple
        small-chips
        deletable-chips
        clearable
        :label="ucfirstFieldName"
        :loading="isLoading"
        :disabled="isLoading"
        :items="cachedItemsArray"
        :value="rawData"
        :search-input.sync="search"
        item-text="name"
        item-value="_id"
        hide-no-data
        @change="onSelect"
    ></v-autocomplete>
</template>

<script>
import { debounce, upperFirst } from 'lodash';
import api from '@api';

export default {
    props: {
        fieldName: {
            type: String,
            required: true
        },
        rawData: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            items: [],
            isLoading: false,
            search: null,
            cachedItems: {},
            cachedItemsArray: []
        };
    },
    computed: {
        ucfirstFieldName() {
            return upperFirst(this.fieldName);
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
        onSelect(values) {
            const rawValues = this.cachedItemsArray.filter(item => values.includes(item._id));
            const ucfirstFieldName = this.ucfirstFieldName;

            this.$emit('setFilters', { [`raw${ucfirstFieldName}`]: rawValues });
        }
    },
    watch: {
        search(value) {
            if (!value) {
                return;
            }

            this.fetchData(value);
        },
        items(value) {
            const localCachedItems = {};

            value.map(item => {
                localCachedItems[JSON.stringify(item)] = item;
            });

            this.cachedItems = {
                ...this.cachedItems,
                ...localCachedItems
            };
        },
        cachedItems(values) {
            this.cachedItemsArray = Object.values(values);
        }
    }
};
</script>
