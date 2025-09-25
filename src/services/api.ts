import axios from 'axios';
export const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
});