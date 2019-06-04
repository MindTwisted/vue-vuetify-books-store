<template>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <span>Books Store</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn
                :to="{ name: 'home' }"
                exact
                flat
            >
                Home
            </v-btn>
            <v-btn
                :to="{ name: 'shop' }"
                exact
                flat
            >
                Shop
            </v-btn>
            <v-btn
                v-if="isLoggedIn"
                :to="{ name: 'cart' }"
                exact
                flat
            >
                <v-badge right>
                    <template v-slot:badge>
                        <span>{{ cartItemsCount }}</span>
                    </template>
                    <v-icon
                        large
                        color="grey lighten-1"
                    >
                        shopping_cart
                    </v-icon>
                </v-badge>
            </v-btn>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                        flat
                        v-on="on"
                    >
                        <v-avatar v-if="!isLoggedIn">
                            <v-icon large>account_circle</v-icon>
                        </v-avatar>
                        <v-avatar v-else color="teal">
                            <span class="white--text headline">
                                {{ auth.name | avatarName }}
                            </span>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-list>
                    <template v-if="!isLoggedIn">
                        <v-list-tile>
                            <TheNavbarLoginModal />
                        </v-list-tile>
                        <v-list-tile>
                            <TheNavbarRegisterModal />
                        </v-list-tile>
                    </template>
                    <template v-else>
                        <v-list-tile>
                            <TheNavbarSettingsModal />
                        </v-list-tile>
                        <v-list-tile>
                            <v-btn
                                flat
                                @click="logoutUser"
                            >
                                <v-icon>power_settings_new</v-icon> Logout
                            </v-btn>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-menu>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { mapState, mapGetters, mapActions, createNamespacedHelpers } from 'vuex';
import TheNavbarRegisterModal from '@components/TheNavbarRegisterModal';
import TheNavbarLoginModal from '@components/TheNavbarLoginModal';
import TheNavbarSettingsModal from '@components/TheNavbarSettingsModal';

const cart = createNamespacedHelpers('cart');

export default {
    components: {
        TheNavbarRegisterModal,
        TheNavbarLoginModal,
        TheNavbarSettingsModal
    },
    computed: {
        ...mapState([
            'auth'
        ]),
        ...mapGetters([
            'isLoggedIn'
        ]),
        ...cart.mapGetters([
            'cartItemsCount'
        ])
    },
    methods: {
        ...mapActions([
            'logoutUser'
        ])
    }
};
</script>
