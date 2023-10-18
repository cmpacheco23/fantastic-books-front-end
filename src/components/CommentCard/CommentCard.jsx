const CommentCard = ({ comment, volumeId,handleDeleteComment, handleEditComment }) => {
  return (
    <article>
      <p>{comment.commenter.name}</p>
      <p>{comment.text}</p>
      <p>{comment.rating}</p>
      <p>{comment.createdAt}</p>

        <button onClick={() => handleEditComment(volumeId, comment._id)}>Edit</button>
        <button onClick={() => handleDeleteComment(volumeId, comment._id)}>Delete</button>


      {/* {comment.commenter._id === user.profile._id &&
      <>
        <button onClick={() => handleEditComment(volumeId, comment._id)}>Edit</button>
        <button onClick={() => handleDeleteComment(volumeId, comment._id)}>Delete</button>
      </>
      } */}
    </article>
  );
}

export default CommentCard;
