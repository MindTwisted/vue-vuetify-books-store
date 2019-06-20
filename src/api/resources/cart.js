import axios from '@api/http/axios';
import { CART_URL } from '@api/http/urls';

export default {
  fetchCart() {
    return axios.get(CART_URL);
  },
  addToCart({ count, book } = {}) {
    const data = {};

    if (count) data.count = count;
    if (book) data.book = book;

    return axios.post(CART_URL, data);
  }
};
