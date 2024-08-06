import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { nanoid } from "@reduxjs/toolkit";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = [
  {
    id: 0,
    name: "Dude Lebowski",
  },
  {
    id: 1,
    name: "Neil Young"
  },
  {
    id: 2,
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
  reducers: {}
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;