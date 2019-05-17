import axios from 'axios';
import config from '@config';

const instance = axios.create({
    baseURL: config.apiUrl
});

instance.interceptors.request.use(config => {
    return config;
});

instance.interceptors.response.use(response => {
    return response;
});

export default instance;
