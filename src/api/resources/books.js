import axios from '@api/http/axios';
import { BOOKS_URL } from '@api/http/urls';

export default {
    fetch(filters) {
        const allowedFilters = ['search', 'authors', 'genres', 'offset'];
        const filterKeys = Object.keys(filters);
        let URL = `${BOOKS_URL}?`;

        filterKeys
            .filter(item => allowedFilters.includes(item))
            .map(key => {
                const value = filters[key];

                if (value) {
                    URL += `${key}=${value}&`;
                }
            });

        return axios.get(URL);
    },
    fetchSingle(id) {
        return axios.get(`${BOOKS_URL}/${id}`);
    }
};
