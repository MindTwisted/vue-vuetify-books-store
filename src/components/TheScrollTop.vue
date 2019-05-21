<template>
    <v-fab-transition>
        <v-btn
            v-scroll="onScroll"
            v-show="isVisible"
            dark
            fab
            fixed
            right
            bottom
            @click="scrollTop"
        >
            <v-icon>arrow_upward</v-icon>
        </v-btn>
    </v-fab-transition>
</template>

<script>
import goTo from 'vuetify/lib/components/Vuetify/goTo';

export default {
    data() {
        return {
            offsetTop: 0
        };
    },
    computed: {
        isVisible() {
            return +this.offsetTop > 500;
        }
    },
    methods: {
        onScroll(e) {
            this.offsetTop = e.pageY;
        },
        scrollTop() {
            return goTo(0);
        }
    }
};
</script>
