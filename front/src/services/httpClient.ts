import axios from 'axios';
import router from "@/routes/router";
import {refreshToken} from "@/services/auth";
const { VITE_API_URL } = import.meta.env;

const http = axios.create({
    baseURL: VITE_API_URL,
    timeout: 5000,
    headers: {
        Authorization: 'Bearer'
    }
});

http.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => Promise.reject(error)
);

http.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const notInvalidRefreshToken = error.response.data.error !== "Invalid or expired refreshToken";

        if (error.response.status === 401 && notInvalidRefreshToken && !originalRequest._retry) {
            originalRequest._retry = true;

            await refreshToken();
            originalRequest.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');

            return http(originalRequest);
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userName');

        await router.push({name: 'login'});

        return Promise.reject(error);
    },
);


export default http;
