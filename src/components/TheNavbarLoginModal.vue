<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="800px"
    >
        <template v-slot:activator="{ on }">
            <v-btn
                v-on="on"
                flat
            >
                Login
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Login</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-if="dialog"
                                v-model="email.value"
                                label="Email"
                                clearable
                                autofocus
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="password.value"
                                label="Password"
                                type="password"
                                clearable
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    dark
                    @click="onSave"
                >
                    Save
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    flat
                    @click="dialog = false"
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

const initialState = {
    dialog: false,
    email: {
        value: ''
    },
    password: {
        value: ''
    }
};

export default {
    data() {
        return { ...initialState };
    },
    methods: {
        ...mapActions([
            'loginUser',
            'setNotification'
        ]),
        async onSave() {
            const response = await this.loginUser({
                email: this.email.value,
                password: this.password.value
            });

            if (response &&
                response.data.status === 'success') {
                this.dialog = false;
            }
        }
    },
    watch: {
        dialog() {
            this.email = { ...initialState.email };
            this.password = { ...initialState.password };
        }
    }
};
</script>
