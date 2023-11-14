// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  // Bạn có thể thêm các tùy chọn cấu hình khác ở đây nếu cần
});

export default store;
