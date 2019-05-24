import axios from '@api/http/axios';
import { AUTH_URL } from '@api/http/urls';

export default {
    register({ name = '', email = '', password = '' }) {
        const URL = `${AUTH_URL}`;

        return axios.post(URL, { name, email, password });
    }
};
