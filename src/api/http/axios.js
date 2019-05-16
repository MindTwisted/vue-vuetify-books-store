import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://docker-machine.test:3000/api'
});

instance.interceptors.request.use(config => {
    return config;
});

instance.interceptors.response.use(response => {
    return response;
});

export default instance;
