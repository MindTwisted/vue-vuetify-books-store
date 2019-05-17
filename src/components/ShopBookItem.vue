<template>
    <v-card class="shopBookItem">
        <div class="shopBookItem__content">
            <v-img
                v-if="book.image"
                :src="fullImagePath"
                aspect-ratio="1.75"
            ></v-img>

            <v-card-title primary-title>
                <h3 class="headline mb-0">{{ book.title }}</h3>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
                <div class="shopBookItem__priceWrapper">
                    <div class="shopBookItem__price">
                        {{ book.price | priceWithDiscount(book.discount) | formatPrice }}
                    </div>
                    <div
                        v-if="book.discount > 0"
                        class="shopBookItem__oldPrice grey--text"
                    >
                        {{ book.price | formatPrice }}
                    </div>
                </div>
                <div class="shopBookItem__genres">
                    <v-item-group>
                        <v-subheader>Genres</v-subheader>
                        <v-item
                            v-for="genre in book.genres"
                            :key="genre._id"
                        >
                            <v-chip small>
                                {{ genre.name }}
                            </v-chip>
                        </v-item>
                    </v-item-group>
                </div>
                <div class="shopBookItem__authors">
                    <v-item-group>
                        <v-subheader>Authors</v-subheader>
                        <v-item
                            v-for="author in book.authors"
                            :key="author._id"
                        >
                            <v-chip
                                small
                                dark
                            >
                                {{ author.name }}
                            </v-chip>
                        </v-item>
                    </v-item-group>
                </div>
            </v-card-text>
        </div>

        <div class="shopBookItem__actions">
            <v-divider></v-divider>

            <v-card-actions>
                <v-btn color="primary">
                    Details
                </v-btn>
                <v-btn color="success">
                    <v-icon>shopping_cart</v-icon>
                </v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
import config from '@config';

export default {
    props: {
        book: {
            type: Object,
            required: true
        }
    },
    computed: {
        fullImagePath() {
            return `${config.rootUrl}/${this.book.imagePath}`;
        }
    }
};
</script>

<style lang="scss" scoped>
.shopBookItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__priceWrapper {
        display: flex;
        padding: 1rem;
        align-items: baseline;
    }

    &__price {
        font-size: 2.75rem;
        font-weight: 300;
        margin-right: 0.25rem;
    }

    &__oldPrice {
        font-size: 1.45rem;
        font-weight: 300;
        text-decoration: line-through;
    }
}
</style>
