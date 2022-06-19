/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isAuthenticated: false,
    sessionId: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem('session_id');
      localStorage.setItem('accountId', action.payload.id);
    },
  },
});

export const { setUser } = auth.actions;
export default auth.reducer;
export const userSelector = (state) => state.user;

