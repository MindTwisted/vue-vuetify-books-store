import axios from 'axios';
import config from '@config';
import store from '@store';

const instance = axios.create({
    baseURL: config.apiUrl
});

instance.interceptors.request.use(config => {
    return config;
});

instance.interceptors.response.use(response => {
    return response;
}, err => {
    const data = err.response && err.response.data;
    const message = (data && data.text) || err.message;

    store.dispatch('setNotification', { text: message, type: 'error' });

    return err.response;
});

export default instance;
