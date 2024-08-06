import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { nanoid } from "@reduxjs/toolkit";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = [
  {
    id: 201,
    name: "Dude Lebowski",
  },
  {
    id: 202,
    name: "Neil Young"
  },
  {
    id: 203,
    name: "King Leonidas"
  }
];

const fetchUsers = createAsyncThunk('users/fetchUsers', () => (
  axios.get(USERS_URL)
    .then((response) => response.data)
));

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => (
      [...state, action.payload]
    ));
  }
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;