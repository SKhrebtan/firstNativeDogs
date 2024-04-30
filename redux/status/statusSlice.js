import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalOpen: false
  };


const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
  },
});
export const {setIsModalOpen} = statusSlice.actions
export const statusReducer = statusSlice.reducer;