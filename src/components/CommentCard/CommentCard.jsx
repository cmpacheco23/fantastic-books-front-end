import React, { useState, useEffect } from 'react';
import styles from './CommentCard.module.css';
// import EditComment from '../EditComment/EditComment';

const CommentCard = (props) => {
  // const [isEditingComment, setIsEditingComment] = useState(false)
  const handleToggleEditForm = () => {
    // props.setFormOpen(true);
    props.setIsEditingComment(!props.isEditingComment);
    const selectedComment = props.comments.find((element) => element._id === props.comment._id);
    // console.log('SELECTED COMMENT', selectedComment)
    props.setSelectedComment(selectedComment)
  };
  
  useEffect(() => {
    // Log the updated selectedComment after it has been updated
    // console.log('Selected Comment:', props.selectedComment);
  }, [props.selectedComment]);
  
  


  
  function getRatingEmojis(rating) {
    if (rating < 1 || rating > 5) {
      return 'Invalid Rating';
    }
    return '⭐'.repeat(rating);
  }
  
  const ratingEmojis = getRatingEmojis(props.comment.rating);
  
  return (
    <article className={styles.commentCard}>
      <div className={styles.commentText}>
        <div className={styles.commenterSection}>
          {props.comment.commenter.photo && (
            <div className={styles.namePhoto}>
              <img
                src={props.comment.commenter.photo}
                alt={`Photo of ${props.comment.commenter.name}`}
                className={styles.commenterPhoto}
              />
            </div>
          )}
        </div>
          {props.comment.commenter.photo && (
            <div className={styles.namePhoto}>
              <img
                src={props.comment.commenter.photo}
                alt={`Photo of ${props.comment.commenter.name}`}
                className={styles.commenterPhoto}
              />
            </div>
          )}
          <p className={styles.commentText}>{props.comment.text}</p>
          <p className={styles.name}>— {props.comment.commenter.name}</p>
          <p className={styles.emojis}>{ratingEmojis}</p>
          <p className={styles.date}>{props.formatDate(props.comment.createdAt)}</p>
      </div>
    <div className={styles.commentButtons}>
      {props.user.profile === props.comment.commenter._id ? (
        <div>
          <button
            onClick={handleToggleEditForm}
            disabled={props.isEditingComment === props.comment._id}
          >
            ✏️
          </button>
          <button
            onClick={() =>
              props.handleDeleteComment(props.volumeId, props.comment._id)
            }
            disabled={props.isEditingComment === props.comment._id}
          >
            🗑️
          </button>
        </div>
      ) : (
        <></>
      )}
      </div>
    </article>
  );
};
  
  export default CommentCard;
  