<template>
    <v-snackbar
        v-model="isVisible"
        top
        center
        :color="color"
    >
        {{ message.text }}
    </v-snackbar>
</template>

<script>
export default {
    props: {
        message: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isVisible: false
        };
    },
    watch: {
        message(value) {
            this.isVisible = Boolean(value.text);
        }
    },
    computed: {
        color() {
            switch (this.message.type) {
                case 'success':
                    return 'green darken-2';
                case 'error':
                    return 'red darken-2';
                default:
                    return 'grey darken-4';
            }
        }
    }
};
</script>
