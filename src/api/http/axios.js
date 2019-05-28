import axios from 'axios';
import config from '@config';
import store from '@store';

const instance = axios.create({
    baseURL: config.apiUrl
});

instance.interceptors.request.use(config => {
    const token = store.state.auth.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

instance.interceptors.response.use(response => {
    return response;
}, err => {
    const data = err.response && err.response.data;
    const message = (data && data.text) || err.message;
    const status = err.response && err.response.status;

    store.dispatch('setNotification', { text: message, type: 'error' });

    if (status === 401) {
        store.dispatch('logoutUser');
    }

    return err.response;
});

export default instance;
