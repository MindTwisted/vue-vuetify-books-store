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
                        dark
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