import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:33321/api'
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});
instance.interceptors.request.use(function (config) {
    // Thêm token vào header của mỗi yêu cầu Axios
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
}, function (error) {
    // Xử lý lỗi nếu cần
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default instance;