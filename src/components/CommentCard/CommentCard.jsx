import { useState } from 'react'; // Import React and useState

import styles from './CommentCard.module.css';

const CommentCard = (props) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  function getRatingEmojis(rating) {
    if (rating < 1 || rating > 5) {
      return 'Invalid Rating';
    }
  
    // Define an array of book emojis
    const bookEmojis = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
  
    return bookEmojis[rating - 1];
  }


  const ratingEmojis = getRatingEmojis(props.comment.rating);

  return (
    <article className={styles.commentCard}>
      <div className={styles.commenterSection}>
        {props.comment.commenter.photo && (
          <div className={styles.namePhoto}>
            <img
              src={props.comment.commenter.photo}
              alt={`Photo of ${props.comment.commenter.name}`}
              className={styles.commenterPhoto}
            />
            <p className={styles.name}>{props.comment.commenter.name}</p>
          </div>
        )}
      </div>
      <div className={styles.commentText}>
        <p>{props.comment.text}</p>
        <p> {ratingEmojis}</p> {/* Use the rating emojis here */}

        <p>Date: {formatDate(props.comment.createdAt)}</p>
      </div>
      <div className={styles.commentButtons}>
        <button
          onClick={() => props.handleEditComment(props.volumeId, props.comment._id)}
          disabled={props.isEditingComment === props.comment._id}
        >
          ✏️
        </button>
        <button
          onClick={() => props.handleDeleteComment(props.volumeId, props.comment._id)}
          disabled={props.isEditingComment === props.comment._id}
        >
          🗑️
        </button>
      </div>
    </article>
  );
}

export default CommentCard;
