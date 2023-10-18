const CommentCard = ({ comment, volumeId, handleDeleteComment, handleEditComment, isEditingComment }) => {

  return (
    <article>
      <p>{comment.commenter.name}</p>
      <p>{comment.text}</p>
      <p>{comment.rating}</p>
      <p>{comment.createdAt}</p>
      
      
      <div>
        <button
          onClick={() => handleEditComment(volumeId, comment._id)}
          disabled={isEditingComment === comment._id}
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteComment(volumeId, comment._id)}
          disabled={isEditingComment === comment._id} // Disable the "Delete" button if the comment is being edited
        >
          Delete
        </button>
      </div>
  
</article>
);
}

export default CommentCard;
