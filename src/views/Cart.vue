<template>
    <div>
        <h1 class="display-3 font-weight-light">Shop</h1>
        <Breadcrumbs :items="breadcrumbs" />
    </div>
</template>

<script>
import Breadcrumbs from '@components/Breadcrumbs';

export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          to: { name: 'home' },
          exact: true
        },
        {
          text: 'Shop',
          disabled: false,
          to: { name: 'shop' },
          exact: true
        },
        {
          text: 'Cart',
          disabled: true
        }
      ]
    };
  }
};
</script>
