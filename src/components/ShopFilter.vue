<template>
    <div class="shopFilter">
        <ShopFilterOpenButton @showPanel="isVisible = true" />
        <v-navigation-drawer
            v-model="isVisible"
            fixed
            temporary
        >
            <ShopFilterPanel
                :search="search"
                @setFilters="$emit('setFilters', $event)"
                @submitFilters="$emit('submitFilters')"
            />
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
    props: {
        search: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isVisible: false
        };
    }
};
</script>
