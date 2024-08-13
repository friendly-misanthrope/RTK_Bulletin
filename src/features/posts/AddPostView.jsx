import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostView = () => {
  const [post, setPost] = useState({
    title: '',
    body: '',
    userId: ''
  });

  const [postReqStatus, setPostReqStatus] = useState('idle');

  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();
  const {title, body, userId} = post;

  const postChangeHandler = (e) => {
    setPost(prevState => {return {...prevState, [e.target.name]: e.target.value}});
  }

  const postIsValid = [title, body, userId].every(Boolean) && postReqStatus === 'idle';

  const savePostOnClick = (e) => {
    e.preventDefault();

    if (postIsValid) {
      try {
        setPostReqStatus('pending');
        dispatch(addPost({title, body, userId})).unwrap();
        setPost({
          title: '',
          body: '',
          userId: ''
        });
      } catch(e) {
        console.error('Unable to save post', e);
      } finally {
        setPostReqStatus('idle');
      }
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

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

        <label htmlFor="userId">Author: </label>
        <select name="userId" id="userId" value={userId} onChange={postChangeHandler}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="body">Post Content: </label>
        <input type="text"
        id="body"
        name="body"
        value={body}
        onChange={postChangeHandler} />

        <button onClick={savePostOnClick} disabled={!postIsValid}>Save Post</button>
      </form>
    </section>
  );
}

export default AddPostView;