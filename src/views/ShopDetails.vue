<template>
    <div v-if="book">
        <Breadcrumbs :items="breadcrumbs" />
        <ShopBookItemFull :book="book" />
    </div>
    <div
        v-else
        class="headline font-weight-thin text-xs-center mt-3"
    >
        There are no book.
    </div>
</template>

<script>
import { createNamespacedHelpers, mapActions } from 'vuex';
import api from '@api';
import ShopBookItemFull from '@components/ShopBookItemFull';
import Breadcrumbs from '@components/Breadcrumbs';

const books = createNamespacedHelpers('books');

export default {
  components: {
    ShopBookItemFull,
    Breadcrumbs
  },
  data() {
    return {
      book: null
    };
  },
  async created() {
    this.activateLoader();

    const id = this.$route.params.id;
    let book = this.getBookById(id);

    if (!book) {
      const response = await api.books.fetchSingle(id);
      book = response && response.data.data.book;
    }

    this.book = book;
    this.deactivateLoader();
  },
  computed: {
    ...books.mapGetters([
      'getBookById'
    ]),
    breadcrumbs() {
      return [
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
          text: this.book.title,
          disabled: true
        }
      ];
    }
  },
  methods: {
    ...mapActions([
      'activateLoader',
      'deactivateLoader'
    ])
  }
};
</script>
