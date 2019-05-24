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
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                        flat
                        v-on="on"
                    >
                        <v-avatar>
                            <v-icon
                                dark
                                large
                            >
                                account_circle
                            </v-icon>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-title>Login</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile>
                        <TheNavbarRegisterModal />
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import TheNavbarRegisterModal from '@components/TheNavbarRegisterModal';

export default {
    components: {
        TheNavbarRegisterModal
    }
};
</script>
