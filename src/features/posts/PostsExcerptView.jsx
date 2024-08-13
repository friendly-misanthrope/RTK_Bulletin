import PostAuthorView from "./PostAuthorView";
import CreatedAt from "./CreatedAtView";
import ReactionsView from "./ReactionsView";

const PostsExcerpt = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      {
        post.body.length > 50 ?
        <p>{post.body.substring(0, 50)}...</p>
          : <p>{post.body}</p>
      }
      
      <p className="postCredit">
        <PostAuthorView userId={post.userId} />
        <CreatedAt timestamp={post.createdAt} />
      </p>
      <ReactionsView post={post} />
    </article>
  )
}
export default PostsExcerpt;