<template>
    <div class="shopFilter">
        <ShopFilterOpenButton @showPanel="isVisible = true" />

        <v-navigation-drawer
            v-model="isVisible"
            fixed
            temporary
        >
            <ShopFilterPanel />
        </v-navigation-drawer>
    </div>
</template>

<script>
import ShopFilterOpenButton from '@components/ShopFilterOpenButton';
import ShopFilterPanel from '@components/ShopFilterPanel';

export default {
    components: {
        ShopFilterOpenButton,
        ShopFilterPanel
    },
    data() {
        return {
            isVisible: false
        };
    }
};
</script>
