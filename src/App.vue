<template>
    <v-app v-bind="theme">
        <Loader :active="isLoading" />
        <TheScrollTop />
        <TheNotificationManager :messages="notification.messages" />

        <TheNavbar />
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Loader from '@components/Loader';
import TheScrollTop from '@components/TheScrollTop';
import TheNotificationManager from '@components/TheNotificationManager';
import TheNavbar from '@components/TheNavbar';

export default {
    components: {
        Loader,
        TheScrollTop,
        TheNotificationManager,
        TheNavbar
    },
    computed: {
        ...mapState([
            'isLoading',
            'notification',
            'appearance'
        ]),
        theme() {
            return {
                [this.appearance.theme]: true
            };
        }
    }
};
</script>
