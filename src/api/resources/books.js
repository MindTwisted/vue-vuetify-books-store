import axios from '@api/http/axios';
import { BOOKS_URL } from '@api/http/urls';

export default {
    fetch({ search, authors, genres, offset } = {}) {
        const params = {};

        if (search) params.search = search;
        if (authors) params.authors = authors;
        if (genres) params.genres = genres;
        if (offset) params.offset = offset;

        return axios.get(BOOKS_URL, { params });
    },
    fetchSingle(id) {
        return axios.get(`${BOOKS_URL}/${id}`);
    }
};
