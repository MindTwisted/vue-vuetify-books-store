import axios from '@api/http/axios';
import { BOOKS_URL } from '@api/http/urls';

export default {
    fetch(filters) {
        const filterKeys = Object.keys(filters);
        let URL = `${BOOKS_URL}?`;

        filterKeys.map(key => {
            const value = filters[key];

            if (value) {
                URL += `${key}=${value}&`;
            }
        });

        return axios.get(URL);
    }
};
