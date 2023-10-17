const CommentCard = ({ comment }) => {
  return (
    <article>
      <p>{comment.commenter.name}</p>
      <p>{comment.text}</p>
      <p>{comment.rating}</p>
      <p>{comment.createdAt}</p>
      <button>Edit</button>
    </article>
  );
}

export default CommentCard;
