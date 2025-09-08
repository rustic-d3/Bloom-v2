import axios from 'axios';
import { ACCESS_TOKEN } from './constants';
export const BASE_URL = import.meta.env.MODE == 'development' ? import.meta.env.VITE_API_URL_LOCAL ?? 'http://127.0.0.1:8000'  : import.meta.env.VITE_API_URL_DEPLOY ;

const api = axios.create({
    baseURL: BASE_URL 
})


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


export default api;