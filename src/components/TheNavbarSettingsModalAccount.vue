<template>
    <v-expansion-panel-content>
        <template v-slot:header>
            <v-subheader>Account</v-subheader>
        </template>
        <v-card>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="name.value"
                                label="Name"
                                :error="!!name.error"
                                :error-messages="name.error"
                                :success="name.isSuccess"
                                :prepend-inner-icon="icons.name"
                                :disabled="!name.isEditable"
                                :readonly="!name.isEditable"
                                required
                            >
                                <template
                                    v-slot:append
                                    v-if="!name.isEditable"
                                >
                                    <v-btn
                                        fab
                                        small
                                        flat
                                        @click="name.isEditable = true"
                                    >
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                </template>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="email.value"
                                label="Email"
                                :error="!!email.error"
                                :error-messages="email.error"
                                :success="email.isSuccess"
                                :prepend-inner-icon="icons.email"
                                :disabled="!email.isEditable"
                                :readonly="!email.isEditable"
                                required
                            >
                                <template
                                    v-slot:append
                                    v-if="!email.isEditable"
                                >
                                    <v-btn
                                        fab
                                        small
                                        flat
                                        @click="email.isEditable = true"
                                    >
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                </template>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="password.value"
                                label="Password"
                                :type="password.fieldType"
                                :error="!!password.error"
                                :error-messages="password.error"
                                :success="password.isSuccess"
                                :prepend-inner-icon="icons.password"
                                :disabled="!password.isEditable"
                                :readonly="!password.isEditable"
                                required
                            >
                                <template
                                    v-slot:append
                                    v-if="!password.isEditable"
                                >
                                    <v-btn
                                        fab
                                        small
                                        flat
                                        @click="password.isEditable = true"
                                    >
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                </template>
                                <template
                                    v-slot:append
                                    v-else
                                >
                                    <v-btn
                                        v-if="password.fieldType === 'password'"
                                        fab
                                        small
                                        flat
                                        @click="password.fieldType = 'text'"
                                    >
                                        <v-icon>visibility</v-icon>
                                    </v-btn>
                                    <v-btn
                                        v-if="password.fieldType === 'text'"
                                        fab
                                        small
                                        flat
                                        @click="password.fieldType = 'password'"
                                    >
                                        <v-icon>visibility_off</v-icon>
                                    </v-btn>
                                </template>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    v-if="isAnyEditable"
                    color="green darken-1"
                    @click="onSave"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-expansion-panel-content>
</template>

<script>
import { mapState, createNamespacedHelpers } from 'vuex';

const users = createNamespacedHelpers('users');
const initialState = {
    name: {
        value: '',
        error: null,
        isSuccess: false,
        isEditable: false
    },
    email: {
        value: '',
        error: null,
        isSuccess: false,
        isEditable: false
    },
    password: {
        value: '',
        error: null,
        isSuccess: false,
        isEditable: false,
        fieldType: 'password'
    }
};

export default {
    props: {
        dialog: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return { ...initialState };
    },
    computed: {
        ...mapState([
            'auth'
        ]),
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
        },
        isAnyEditable() {
            return this.name.isEditable ||
                this.email.isEditable ||
                this.password.isEditable;
        }
    },
    methods: {
        ...users.mapActions([
            'updateCurrentUser'
        ]),
        async onSave() {
            const response = await this.updateCurrentUser({
                name: this.name.value,
                email: this.email.value,
                password: this.password.value
            });

            if (!response || !response.data.data) {
                return;
            }

            const data = response.data;
            const errors = data.data.errors;
            const nameError = errors && errors.name;
            const emailError = errors && errors.email;
            const passwordError = errors && errors.password;

            this.name.isEditable = true;
            this.email.isEditable = true;
            this.password.isEditable = true;
            this.name.error = nameError;
            this.email.error = emailError;
            this.password.error = passwordError;
            this.name.isSuccess = !nameError;
            this.email.isSuccess = !emailError;
            this.password.isSuccess = !passwordError;
        }
    },
    watch: {
        dialog() {
            this.name = { ...initialState.name, value: this.auth.name };
            this.email = { ...initialState.email, value: this.auth.email };
            this.password = { ...initialState.password };
        }
    }
};
</script>
