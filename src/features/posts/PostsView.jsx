import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthorView from "./PostAuthorView";
import CreatedAt from "./CreatedAt";

const PostsView = () => {
  const posts = useSelector(selectAllPosts);

  const renderedPosts = posts.map(post => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthorView userId={post.userId} />
        <CreatedAt timestamp={post.createdAt} />
      </p>
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