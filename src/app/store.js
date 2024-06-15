import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';  // Ensure this path is correct

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});