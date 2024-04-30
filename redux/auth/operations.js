import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  login,
  register,
  refresh,
  logout,
 } from '../api.js';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (body, thunkAPI) => {
    try {
      const response = await register(body);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const loginUser = createAsyncThunk('auth/login', async (body, thunkAPI) => {
 
  try {
    const data = await login(body);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const data = await logout();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      const data = await refresh(persistedToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);