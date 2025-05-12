import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setLoginState } = authSlice.actions;

export default authSlice.reducer;
