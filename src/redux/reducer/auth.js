import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    payload: null,
  },
  reducers: {
    handleLog(state) {
      state.isAuthenticated = !state.isAuthenticated;
    },
    login(state, action) {
      state.isAuthenticated = true;
    },
    handleSearch(state, action) {
      state.payload = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout, handleSearch, handleLog } = authReducer.actions;
export default authReducer.reducer;
