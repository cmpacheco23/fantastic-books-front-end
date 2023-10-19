import React, { useState } from 'react'; // Import React and useState

import styles from './CommentCard.module.css';

const CommentCard = (props) => {
  // Initialize the formData state with the comment data
  const [formData, setFormData] = useState(props.comment);

  return (
    <article>
      <p>{props.comment.commenter.name}</p>
      <p>{formData.text}</p> {/* Use formData for text */}
      <p>{formData.rating}</p> {/* Use formData for rating */}
      <p>{props.comment.createdAt}</p>
      
      <div>
        <button
          onClick={() => props.handleEditComment(props.volumeId, props.comment._id)}
          disabled={props.isEditingComment === props.comment._id}
        >
          Edit
        </button>
        <button onClick={() => props.handleDeleteComment(props.volumeId, props.comment._id)} disabled={props.isEditingComment === props.comment._id}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default CommentCard;
