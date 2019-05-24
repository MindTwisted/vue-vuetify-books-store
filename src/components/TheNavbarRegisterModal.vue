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
                Register
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Register</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-if="dialog"
                                v-model="name.value"
                                label="Name"
                                :error="!!name.error"
                                :error-messages="name.error"
                                :success="name.isSuccess"
                                :prepend-inner-icon="icons.name"
                                autofocus
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="email.value"
                                label="Email"
                                :error="!!email.error"
                                :error-messages="email.error"
                                :success="email.isSuccess"
                                :prepend-inner-icon="icons.email"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="password.value"
                                label="Password"
                                type="password"
                                :error="!!password.error"
                                :error-messages="password.error"
                                :success="password.isSuccess"
                                :prepend-inner-icon="icons.password"
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
import api from '@api';
import { mapActions } from 'vuex';

const initialState = {
    dialog: false,
    name: {
        value: '',
        error: null,
        isSuccess: false
    },
    email: {
        value: '',
        error: null,
        isSuccess: false
    },
    password: {
        value: '',
        error: null,
        isSuccess: false
    }
};

export default {
    data() {
        return { ...initialState };
    },
    computed: {
        icons() {
            const detectIcon = (field) => {
                if (field.error) {
                    return 'clear';
                }

                if (field.isSuccess) {
                    return 'done';
                }

                return '';
            };

            return {
                name: detectIcon(this.name),
                email: detectIcon(this.email),
                password: detectIcon(this.password)
            };
        }
    },
    methods: {
        ...mapActions([
            'activateLoader',
            'deactivateLoader',
            'setNotification'
        ]),
        async onSave() {
            this.activateLoader();

            const response = await api.auth.register({
                name: this.name.value,
                email: this.email.value,
                password: this.password.value
            });
            const data = response.data;
            const errors = data.data.errors;
            const nameError = errors && errors.name;
            const emailError = errors && errors.email;
            const passwordError = errors && errors.password;

            this.name.error = nameError;
            this.email.error = emailError;
            this.password.error = passwordError;
            this.name.isSuccess = !nameError;
            this.email.isSuccess = !emailError;
            this.password.isSuccess = !passwordError;

            this.deactivateLoader();

            if (!errors) {
                this.dialog = false;
                this.setNotification({ message: { text: data.text, type: 'success' } });
            }
        }
    },
    watch: {
        dialog() {
            this.name = { ...initialState.name };
            this.email = { ...initialState.email };
            this.password = { ...initialState.password };
        }
    }
};
</script>
