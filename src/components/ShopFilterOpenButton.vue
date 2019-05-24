<template>
    <div class="shopFilterOpenButton">
        <v-btn
            color="orange"
            dark
            fab
            @click="$emit('showPanel')"
        >
            <v-icon>filter_list</v-icon>
        </v-btn>
        <v-badge
            v-show="isFiltersApplied"
            class="isAppliedIcon"
            color="green"
        >
            <template v-slot:badge>
                <v-icon
                    dark
                    small
                >done</v-icon>
            </template>
        </v-badge>
    </div>
</template>

<script>
export default {
    props: {
        isFiltersApplied: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.shopFilterOpenButton {
    top: 6rem;
    position: fixed;
    right: 1rem;
    z-index: 4;
}

.isAppliedIcon {
    position: absolute;
    right: 25px;
    top: 15px;
}
</style>
