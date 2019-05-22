<template>
    <div class="shopFilter">
        <ShopFilterOpenButton
            :isFiltersApplied="isFiltersApplied"
            @showPanel="isVisible = true"
        />
        <v-navigation-drawer
            v-model="isVisible"
            fixed
            temporary
        >
            <ShopFilterPanel
                :search="search"
                :rawAuthors="rawAuthors"
                :rawGenres="rawGenres"
                @setFilters="$emit('setFilters', $event)"
                @submitFilters="$emit('submitFilters')"
                @clearFilters="$emit('clearFilters')"
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
        },
        rawAuthors: {
            type: Array,
            required: true
        },
        rawGenres: {
            type: Array,
            required: true
        },
        isFiltersApplied: {
            type: Boolean,
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
