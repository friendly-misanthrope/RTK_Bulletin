import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    body: "I've heard good things",
    createdAt: sub(new Date(), { minutes: 10 }).toISOString()
  },
  {
    id: '2',
    title: 'Slices...',
    body: "The more I say slice, the more I want pizza.",
    createdAt: sub(new Date(), { minutes: 5 }).toISOString()
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
            createdAt: new Date().toISOString(),
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