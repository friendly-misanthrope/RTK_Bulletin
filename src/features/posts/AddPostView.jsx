import { useState } from "react";

const AddPostView = () => {
  const [post, setPost] = {
    title: '',
    body: ''
  }

  const postChangeHandler = (e) => {
    setPost(prevState => {return {...prevState, [e.target.name]: e.target.value}})
  }

}

export default AddPostView;