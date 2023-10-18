import { useState } from "react";

const CommentCard = ({ comment, volumeId,handleDeleteComment, handleEditComment }) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <article>
      <p>{comment.commenter.name}</p>
      <p>{comment.text}</p>
      <p>{comment.rating}</p>
      <p>{comment.createdAt}</p>
      
      
      {isEditing ? (
        <div>
          <textarea value={comment.text} />
          <button onClick={() => setIsEditing(false)}>Cancel</button>
          <button onClick={() => handleEditComment(volumeId, comment._id)}>Save</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDeleteComment(volumeId, comment._id)}>Delete</button>
        </div>
      )}
</article>
);
}

export default CommentCard;
