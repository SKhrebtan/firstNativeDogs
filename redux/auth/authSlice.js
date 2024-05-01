import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
  };

import {
  registerUser,
  loginUser,
  logOut,
  refreshUser,
  updateAvatar
} from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setResendShown(state, action) {
      state.isResendShown = action.payload;
    },
    logoutUser(state, _) {
      state.token = null;
    },
  },

  extraReducers: (builder) =>
    builder
    .addCase(updateAvatar.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateAvatar.fulfilled, (state,action) => {
      state.isLoading = false;
      state.user.avatar = action.payload.avatar
    })
    .addCase(updateAvatar.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state,action) => {
        state.isLoading = false;
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        
        state.user = payload;
        state.token = payload.token;
        state.isLoading = false;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, { payload }) => {
        state.user = initialState.user;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.isLoading = false;
        state.token = null;
        state.error = payload;
      })
});
export const {logoutUser} = authSlice.actions;
export const authReducer = authSlice.reducer;