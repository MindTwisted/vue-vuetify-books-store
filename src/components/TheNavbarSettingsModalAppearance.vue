<template>
    <v-expansion-panel-content>
        <template v-slot:header>
            <v-subheader>Appearance</v-subheader>
        </template>
        <v-card>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-select
                                :items="appearance.allowedThemes"
                                :value="appearance.theme"
                                label="Theme"
                                @change="onChangeTheme"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-expansion-panel-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState([
            'appearance'
        ])
    },
    methods: {
        ...mapActions([
            'setTheme'
        ]),
        onChangeTheme(value) {
            this.setTheme({ theme: value });
        }
    }
};
</script>
