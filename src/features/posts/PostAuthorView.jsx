import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthorView = ({userId}) => {
  const users = useSelector(selectAllUsers)
  const author = users.find(user => user.id.toString() === userId);

  return (
    <span>by {author? author.name : 'Unknown Author'}</span>
  )
}

export default PostAuthorView;