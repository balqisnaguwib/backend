import { createSlice } from '@reduxjs/toolkit';
import { setSession, removeSession } from '../utils/jwt';

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isInitialized = true;
      state.isAuthenticated = true;
      setSession(action?.payload?.token);
      state.user = action?.payload?.user;
    },
    logout: (state) => {
      state.isInitialized = true;
      state.isAuthenticated = false;
      removeSession();
      state.user = null;
    },
  },
});

export const { login, logout } = auth.actions;

export default auth.reducer;
