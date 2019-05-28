<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ on }">
            <v-btn
                v-on="on"
                flat
            >
                <v-icon>settings</v-icon> Settings
            </v-btn>
        </template>
        <v-card>
            <v-toolbar color="primary">
                <v-btn
                    icon
                    @click="dialog = false"
                >
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
            </v-toolbar>
            <v-expansion-panel v-model="openedPanel">
                <TheNavbarSettingsModalAppearance />
            </v-expansion-panel>
        </v-card>
    </v-dialog>
</template>

<script>
import TheNavbarSettingsModalAppearance from '@components/TheNavbarSettingsModalAppearance';

export default {
    components: {
        TheNavbarSettingsModalAppearance
    },
    data() {
        return {
            dialog: false,
            openedPanel: 0
        };
    },
    watch: {
        dialog() {
            this.openedPanel = 0;
        }
    }
};
</script>
