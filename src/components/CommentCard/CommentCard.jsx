const CommentCard = ({ comment, onEditClick }) => {
  return (
    <article>
      <p>{comment.commenter.name}</p>
      <p>{comment.text}</p>
      <p>{comment.rating}</p>
      <button onClick={() => onEditClick(comment._id)}>Edit</button>
    </article>
  );
}

export default CommentCard;
