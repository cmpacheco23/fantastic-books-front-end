import { Link } from "react-router-dom";
const CommentCard = ({comment}) => {
  return ( 
    <article>
      <p>{comment.commenter.name}</p>
      <p>{comment.text}</p>
      <p>{comment.rating}</p>
      <Link to={{ pathname: "/edit-comment", state: comment }}>
        <button>Edit</button>
      </Link>

    </article>
  )
}

export default CommentCard;