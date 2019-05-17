<template>
    <v-container
        grid-list-lg
        fluid
    >
        <v-layout
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
                <ShopBookItem :book="book" />
            </v-flex>
        </v-layout>
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
