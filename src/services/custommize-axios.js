import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:33321/api'
});
instance.interceptors.request.use(function (config) {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default instance;