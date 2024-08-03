import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "./postsSlice";

const AddPostView = () => {
  const [post, setPost] = {
    title: '',
    body: ''
  }

  const {title, body} = post;

  const postChangeHandler = (e) => {
    setPost(prevState => {return {...prevState, [e.target.name]: e.target.value}})
  }

  const savePostOnClick = () => {
    if (title && body) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          body
        })
      );

      setPost({
        title: '',
        body: ''
      });
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="title">Post Title: </label>
        <input type="text"
        id="title"
        name="title"
        value={title}
        onChange={postChangeHandler} />

        <label htmlFor="body">Post Content: </label>
        <input type="text"
        id="body"
        name="body"
        value={body}
        onChange={postChangeHandler} />
      </form>
    </section>
  );
}

export default AddPostView;