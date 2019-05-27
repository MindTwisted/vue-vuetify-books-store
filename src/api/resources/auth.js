import axios from '@api/http/axios';
import { AUTH_URL } from '@api/http/urls';

export default {
    register({ name, email, password } = {}) {
        const data = {};

        if (name) data.name = name;
        if (email) data.email = email;
        if (password) data.password = password;

        return axios.post(AUTH_URL, data);
    },
    login({ email, password } = {}) {
        const data = {};

        if (email) data.email = email;
        if (password) data.password = password;

        return axios.put(AUTH_URL, data);
    }
};
