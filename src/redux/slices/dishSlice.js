// src/redux/slices/dishSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDishes = createAsyncThunk('dishes/fetchDishes', async () => {
  const response = await fetch('https://dummyjson.com/recipes');
  const data = await response.json();
  return data.recipes;
});

const dishSlice = createSlice({
  name: 'dishes',
  initialState: {
    allDishes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allDishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dishSlice.reducer;
