import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const loading = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    setIsNotLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setIsLoading, setIsNotLoading } = loading.actions;

export default loading.reducer;
