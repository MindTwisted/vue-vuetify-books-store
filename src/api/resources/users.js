import axios from '@api/http/axios';
import { USERS_URL } from '@api/http/urls';

export default {
    updateCurrent({ name, email, password } = {}) {
        const data = {};

        if (name) data.name = name;
        if (email) data.email = email;
        if (password) data.password = password;

        return axios.put(USERS_URL, data);
    }
};
