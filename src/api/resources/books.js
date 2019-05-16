import axios from '@api/http/axios';
import { BOOKS_URL } from '@api/http/urls';

export default {
    fetch() {
        return axios.get(`${BOOKS_URL}`);
    }
};
