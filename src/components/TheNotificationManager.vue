<template>
  <div class="theNotificationManager">
    <v-scale-transition group>
      <v-alert
        v-for="message in messages"
        :key="message.id"
        :value="true"
        :type="message.type"
      >
        {{ message.text }}
      </v-alert>
    </v-scale-transition>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.theNotificationManager {
    position: fixed;
    right: 0;
    bottom: 0;
    max-width: 350px;
    width: 100%;
    z-index: 202;
}
</style>
