import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from './slices/cartSlice';
import dishReducer from './slices/dishSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    dishes:dishReducer,
  },
});

export default store;
