import axios from '@api/http/axios';
import { BOOKS_URL } from '@api/http/urls';

export default {
    fetch({ search }) {
        let URL = `${BOOKS_URL}?`;

        if (search) {
            URL += `search=${search}`;
        }

        return axios.get(URL);
    }
};
