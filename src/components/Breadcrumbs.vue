<template>
    <v-breadcrumbs
        large
        light
        :items="items"
    >
        <template v-slot:divider>
            <v-icon>arrow_forward</v-icon>
        </template>
    </v-breadcrumbs>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    }
};
</script>
