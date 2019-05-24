import axios from '@api/http/axios';
import { GENRES_URL } from '@api/http/urls';

export default {
    fetch({ search } = {}) {
        const params = {};

        if (search) params.search = search;

        return axios.get(GENRES_URL, { params });
    }
};
