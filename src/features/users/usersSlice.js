import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', () => (
  axios.get(USERS_URL)
    .then((response) => response.data)
));

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => 
      (action.payload));
  }
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;