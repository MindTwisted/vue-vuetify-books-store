import axios from '@api/http/axios';
import { AUTHORS_URL } from '@api/http/urls';

export default {
    fetch(filters) {
        const allowedFilters = ['search'];
        const filterKeys = Object.keys(filters);
        let URL = `${AUTHORS_URL}?`;

        filterKeys
            .filter(item => allowedFilters.includes(item))
            .map(key => {
                const value = filters[key];

                if (value) {
                    URL += `${key}=${value}&`;
                }
            });

        return axios.get(URL);
    }
};
