import axios from 'axios';

// Khởi tạo một phiên Axios mới với cấu hình interceptor
const axiosInstance = axios.create();

// Thêm interceptor cho request
axiosInstance.interceptors.request.use((config) => {
  const jwtToken = localStorage.getItem('token');
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
});

export default axiosInstance;