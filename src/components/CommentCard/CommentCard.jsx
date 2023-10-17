const CommentCard = ({ comment, onEditClick, volumeId }) => {
  return (
    <article>
      <p>{comment.commenter.name}</p>
      <p>{comment.text}</p>
      <p>{comment.rating}</p>
      <button onClick={() => onEditClick(comment._id, volumeId, comment)}>Edit</button>
    </article>
  );
}

export default CommentCard;
