<template>
    <v-app>
        <Loader :active="isLoading" />
        <TheScrollTop />
        <TheNotificationManager :message="notification.message" />

        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Books Store</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn :to="{ name: 'home' }" exact flat>Home</v-btn>
                <v-btn :to="{ name: 'shop' }" exact flat>Shop</v-btn>
            </v-toolbar-items>
        </v-toolbar>

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

export default {
    components: {
        Loader,
        TheScrollTop,
        TheNotificationManager
    },
    computed: {
        ...mapState([
            'isLoading',
            'notification'
        ])
    }
};
</script>
