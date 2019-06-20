<template>
  <v-card class="shopBookItemFull">
    <div>
      <v-img
        v-if="book.image"
        :src="fullImagePath"
        aspect-ratio="3.25"
      ></v-img>

      <v-card-title primary-title>
        <h3 class="headline mb-0">{{ book.title }}</h3>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <div class="priceWrapper">
          <div class="price">
            {{ book.price | priceWithDiscount(book.discount) | formatPrice }}
          </div>
          <div
            v-if="book.discount > 0"
            class="oldPrice grey--text"
          >
            {{ book.price | formatPrice }}
          </div>
        </div>
        <div>
          <v-subheader>Genres</v-subheader>
          <v-chip
            v-for="genre in book.genres"
            :key="genre._id"
            small
          >
            {{ genre.name }}
          </v-chip>
        </div>
        <div>
          <v-subheader>Authors</v-subheader>
          <v-chip
            v-for="author in book.authors"
            :key="author._id"
            small
          >
            {{ author.name }}
          </v-chip>
        </div>
        <div>
          <v-subheader>Description</v-subheader>
          {{ book.description }}
        </div>
      </v-card-text>
    </div>

    <div>
      <v-divider></v-divider>

      <v-card-actions>
        <template v-if="isLoggedIn">
          <v-btn
            v-if="!isInCart(book._id)"
            @click="handleAddToCart"
            color="success"
            :loading="isLoading"
          >
            <v-icon>shopping_cart</v-icon>
          </v-btn>
          <v-btn
            v-else
            disabled
          >
            in cart
          </v-btn>
        </template>
          <template v-else>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  color="success"
                >
                  <v-icon>shopping_cart</v-icon>
                </v-btn>
              </template>
              <span>You need to sign-in to make a purchase.</span>
            </v-tooltip>
          </template>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, createNamespacedHelpers } from 'vuex';
import config from '@config';

const cart = createNamespacedHelpers('cart');

export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    ...cart.mapGetters([
      'isInCart'
    ]),
    fullImagePath() {
      return `${config.rootUrl}/${this.book.imagePath}`;
    }
  },
  methods: {
    ...cart.mapActions([
      'addToCart'
    ]),
    async handleAddToCart() {
      this.isLoading = true;

      await this.addToCart({ count: 1, book: this.book._id });

      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.shopBookItemFull {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.priceWrapper {
    display: flex;
    padding: 1rem;
    align-items: baseline;
}

.price {
    font-size: 2.75rem;
    font-weight: 300;
    margin-right: 0.25rem;
}

.oldPrice {
    font-size: 1.45rem;
    font-weight: 300;
    text-decoration: line-through;
}
</style>
