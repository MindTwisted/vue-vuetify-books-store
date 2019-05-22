<template>
    <v-container
        grid-list-lg
        fluid
    >
        <v-layout
            v-if="books.length"
            row
            wrap
        >
            <v-flex
                d-flex
                xs12
                sm6
                md4
                lg3
                v-for="book in books"
                :key="book._id"
            >
                <ShopBookItem
                    :book="book"
                    @setAndSubmitFilters="$emit('setAndSubmitFilters', $event)"
                />
            </v-flex>
        </v-layout>
        <div
            v-else
            class="headline font-weight-thin text-xs-center mt-3"
        >There are no books.</div>
    </v-container>
</template>

<script>
import ShopBookItem from '@components/ShopBookItem';

export default {
    props: {
        books: {
            type: Array,
            required: true
        }
    },
    components: {
        ShopBookItem
    }
};
</script>
