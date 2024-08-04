import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from 'axios';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  posts: [],
  status: 'idle', // 'idle' || 'pending' || 'fulfilled' || 'rejected'
  error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', () => {
  axios.get(POSTS_URL)
    .then((res) => [...res.data]);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.reactions[reaction]++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        let min = 1;
        const posts = action.payload.map(post => {
          post.createdAt = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
          return post
        });
        state.posts = state.posts.concat(posts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message
      });
  } 
});

export const selectAllPosts = (state) => state.posts.posts;
export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;