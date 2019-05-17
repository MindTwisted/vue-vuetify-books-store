<template>
    <v-btn
        class="shopFilterOpenButton"
        color="orange"
        dark
        fab
        fixed
        right
        @click="$emit('showPanel')"
    >
        <v-icon>filter_list</v-icon>
    </v-btn>
</template>

<style lang="scss" scoped>
.shopFilterOpenButton {
    top: 6rem;
}
</style>
