import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BallTriangle } from "react-loader-spinner";
import PostsExcerpt from "./PostsExcerpt";
import {
  selectAllPosts,
  fetchPosts,
  getPostsStatus,
  getPostsError,
} from "./postsSlice";

const PostsView = () => {
  const dispatch = useDispatch();

  // postsSlice selectors
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  // JSONplaceholder API fetch
  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;

  // Loading spinner
  if (postsStatus === "pending") {
    content = 
    <>
      <p className="loader">Loading...</p>
      <div className="loader">
        <BallTriangle 
        height={100}
        color="#61dbfb" />
      </div>
    </>;
    // Posts content if fetch successful
  } else if (postsStatus === "fulfilled") {
    const orderedPosts = posts.slice().sort((a, b) => {
      b.createdAt.localeCompare(a.createdAt);
    });
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
    // PostsView content if fetch not successful
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
