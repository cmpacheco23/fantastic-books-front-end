import { useState } from "react";

const CommentCard = ({ comment, volumeId, handleDeleteComment, handleEditComment, isEditingComment }) => {
  // const [editedCommentText, setEditedCommentText] = useState(comment.text);

  // const handleCommentTextChange = (evt) => {
  //   setEditedCommentText(evt.target.value);
  // }
  return (
    <article>
      <p>{comment.commenter.name}</p>
      <p>{comment.text}</p>
      <p>{comment.rating}</p>
      <p>{comment.createdAt}</p>
      
      
      <div>
        {/* Disable the "Edit" button if the comment is being edited */}
        <button
          onClick={() => handleEditComment(volumeId, comment._id)}
          disabled={isEditingComment === comment._id}
        >
          Edit
        </button>
        <button onClick={() => handleDeleteComment(volumeId, comment._id)}>Delete</button>
      </div>
  
</article>
);
}

export default CommentCard;
