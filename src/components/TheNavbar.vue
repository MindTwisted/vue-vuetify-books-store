<template>
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
</template>
