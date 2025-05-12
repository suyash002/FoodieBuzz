// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [],
//   itemCount: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const exists = state.cartItems.find(item => item.id === action.payload.id);
//       if (!exists) {
//         state.cartItems.push(action.payload);
//         state.itemCount += 1;
//       }
//     },
//     removeFromCart: (state, action) => {
//       const index = state.cartItems.findIndex(item => item.id === action.payload);
//       if (index !== -1) {
//         state.cartItems.splice(index, 1);
//         state.itemCount = Math.max(0, state.itemCount - 1);
//       }
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//       state.itemCount = 0;
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

