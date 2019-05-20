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
            <form @submit.prevent="submitFilters">
                <v-list-tile>
                    <v-text-field
                        v-model="searchFilter"
                        label="Search"
                        clearable
                    ></v-text-field>
                </v-list-tile>

                <v-list-tile>
                    <v-btn
                        color="success"
                        @click="submitFilters"
                    >
                        Submit
                    </v-btn>

                    <v-btn
                        color="error"
                        @click="clearFilters"
                    >
                        Reset
                    </v-btn>
                </v-list-tile>
            </form>
        </v-list>
    </div>
</template>

<script>
export default {
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
    },
    methods: {
        submitFilters() {
            this.$emit('submitFilters');
        },
        clearFilters() {
            this.$emit('clearFilters');
        }
    }
};
</script>
