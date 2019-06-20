<template>
  <v-app v-bind="theme">
    <Loader :active="isLoading" />
    <TheScrollTop />
    <TheNotificationManager :messages="notification.messages" />

    <TheNavbar />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters, createNamespacedHelpers } from 'vuex';
import Loader from '@components/Loader';
import TheScrollTop from '@components/TheScrollTop';
import TheNotificationManager from '@components/TheNotificationManager';
import TheNavbar from '@components/TheNavbar';

const cart = createNamespacedHelpers('cart');

export default {
  components: {
    Loader,
    TheScrollTop,
    TheNotificationManager,
    TheNavbar
  },
  created() {
    if (this.isLoggedIn) {
      this.fetchCart();
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'notification',
      'appearance'
    ]),
    ...mapGetters([
      'isLoggedIn'
    ]),
    theme() {
      return {
        [this.appearance.theme]: true
      };
    }
  },
  methods: {
    ...cart.mapActions([
      'fetchCart'
    ])
  }
};
</script>
