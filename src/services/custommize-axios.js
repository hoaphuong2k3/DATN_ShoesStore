import axios from "axios";

const instance = axios.create({
    baseURL: 'https://6400520c9f844910298dfcbb.mockapi.io'
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default instance;