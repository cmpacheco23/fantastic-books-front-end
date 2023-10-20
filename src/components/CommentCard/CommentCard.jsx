import { useState } from 'react'; // Import React and useState
import styles from './CommentCard.module.css';

const CommentCard = (props) => {
  const [formData, setFormData] = useState(props.comment);
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' });

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
              className={styles.commenterPhoto}/>
            <p className={styles.name}>{props.comment.commenter.name}</p>
      </div>
        )}
      </div>
        <p className={styles.commentText}>{props.comment.text}</p>
        <p>{formatDate(props.comment.createdAt)}</p>
        <p>{ratingEmojis}</p>
      </div> 
      <div className={styles.commentButtons}>
        <button
          onClick={() => props.handleToggleEditForm()}
          disabled={props.isEditingComment === props.comment._id}>
          ✏️
        </button>
        <button
          onClick={() => props.handleDeleteComment(props.volumeId, props.comment._id)}
          disabled={props.isEditingComment === props.comment._id}
        >🗑️</button>
      </div>
    </article>
  );
}

export default CommentCard;
