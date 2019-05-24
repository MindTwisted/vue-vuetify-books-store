<template>
    <div>
        <v-card>
            <v-responsive min-height="500">
                <v-container fill-height>
                    <v-layout align-center>
                        <v-flex>
                            <h3 class="display-3">Lorem, ipsum dolor.</h3>

                            <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>

                            <v-divider class="my-3"></v-divider>

                            <div class="title mb-3">Lorem ipsum dolor sit amet.</div>

                            <v-btn
                                :to="{ name: 'shop' }"
                                class="mx-0"
                                color="primary"
                                large
                            >
                                See shop
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-responsive>
        </v-card>
    </div>
</template>
