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
                    <v-subheader>Genres</v-subheader>
                    <v-chip
                        class="shopBookItem__tag"
                        v-for="genre in book.genres"
                        :key="genre._id"
                        small
                        @click="filterByGenre(genre)"
                    >
                        {{ genre.name }}
                    </v-chip>
                </div>
                <div class="shopBookItem__authors">
                    <v-subheader>Authors</v-subheader>
                    <v-chip
                        class="shopBookItem__tag"
                        v-for="author in book.authors"
                        :key="author._id"
                        small
                        dark
                        @click="filterByAuthor(author)"
                    >
                        {{ author.name }}
                    </v-chip>
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
    },
    methods: {
        filterByGenre(genre) {
            this.$emit('setAndSubmitFilters', { rawGenres: [genre] });
        },
        filterByAuthor(author) {
            this.$emit('setAndSubmitFilters', { rawAuthors: [author] });
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

<style lang="scss">
.shopBookItem {
    &__tag {
        .v-chip {
            &__content {
                cursor: pointer;
            }
        }
    }
}
</style>
