import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  fetchPosts,
  getPostsStatus,
  getPostsError,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { BallTriangle } from "react-loader-spinner";

const PostsView = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "pending") {
    // Loading spinner
    content = 
    <>
      <p className="loader">Loading...</p>
      <div className="loader">
        <BallTriangle 
        height={100}
        color="#61dbfb" />
      </div>
    </>;
  } else if (postsStatus === "fulfilled") {
    const orderedPosts = posts.slice().sort((a, b) => {
      b.createdAt.localeCompare(a.createdAt);
    });
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "rejected") {
    content = <p>{postsError}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsView;
