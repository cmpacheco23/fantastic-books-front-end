import styles from "./CommentCard.module.css"

const CommentCard = ({ comment, volumeId, handleDeleteComment, handleEditComment, isEditingComment, handleCancelEdit }) => {

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
          disabled={isEditingComment === comment._id}
        >
          Delete
        </button>
      </div>
  
</article>
);
}

export default CommentCard;
