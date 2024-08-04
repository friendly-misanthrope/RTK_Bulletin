import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, fetchPosts, getPostsStatus, getPostsError } from "./postsSlice";
import PostAuthorView from "./PostAuthorView";
import CreatedAt from "./CreatedAt";
import ReactionsView from "./ReactionsView";

const PostsView = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  },[postsStatus, dispatch])

  const orderedPosts = posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const renderedPosts = orderedPosts.map(post => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthorView userId={post.userId} />
        <CreatedAt timestamp={post.createdAt} />
      </p>
      <ReactionsView post={post} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsView;