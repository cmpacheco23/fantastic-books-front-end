import EditComment from "../EditComment/EditComment"
import { Link } from "react-router-dom";
const CommentCard = ({comment}) => {
  return ( 
    <article>
      <p>{comment.commenter.name}</p>
      <p>{comment.text}</p>
      <p>{comment.rating}</p>
      <Link>      <button>Edit</button></Link>
      {/* to={`/profiles/${profile._id}`} */}

    </article>
  )
}

export default CommentCard;