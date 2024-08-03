import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    body: "I've heard good things"
  },
  {
    id: '2',
    title: 'Slices...',
    body: "The more I say slice, the more I want pizza."
  }
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, body, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            userId
          }
        }
      }
    }
  }
});

export const selectAllPosts = (state) => state.posts;
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;