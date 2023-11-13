import React, { useState } from 'react';
import styles from './CommentCard.module.css';
import EditComment from '../EditComment/EditComment';

const CommentCard = (props) => {
  const [isEditingComment, setIsEditing] = useState(false);

  const handleToggleEditForm = () => {
    setIsEditing(!isEditingComment);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

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
              <p className={styles.name}>{props.comment.commenter.name}</p>
            </div>
          )}
        </div>
        {isEditingComment ? (
          <EditComment
            volumeId={props.volumeId}
            comment={props.comment}
            user={props.user}
            handleUpdateComment={props.handleUpdateComment}
            handleCancelEdit={props.handleToggleEditForm}
            commentSelect={props.selectedComment || { text: '', rating: '1' }}
            formOpen={props.formOpen}
            setFormOpen={props.setFormOpen}
            commentSavedUpdateRender={props.commentSavedUpdateRender}
          />
        ) : (
          <>
            <p className={styles.commentText}>{props.comment.text}</p>
            <p>{formatDate(props.comment.createdAt)}</p>
            <p>{ratingEmojis}</p>
          </>
        )}
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
