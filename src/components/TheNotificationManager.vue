<template>
    <div class="theNotificationManager">
        <v-snackbar
            v-model="isVisible"
            :bottom="true"
            :right="true"
            :color="color"
        >
            {{ message.text }}
            <v-btn
                dark
                flat
                @click="isVisible = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
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
