import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    body: "I've heard good things",
    createdAt: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      hearth: 0,
      rocket: 0,
      coffee: 0
    }
  },
  {
    id: '2',
    title: 'Slices...',
    body: "The more I say slice, the more I want pizza.",
    createdAt: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      hearth: 0,
      rocket: 0,
      coffee: 0
    }
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
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        }
      }
    },
    reactionAdded(state, action) {
      const {postId, reaction} = action.payload;
      const post = state.find(post => post.id === postId);
      if (post) {
        post.reactions[reaction]++
      }
    }
  }
});

export const selectAllPosts = (state) => state.posts;
export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;