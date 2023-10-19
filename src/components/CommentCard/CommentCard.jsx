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
  //doesnt render when the comment is made  however if page is rerendered  it shows up in the console
  // issue is probably that im not letting it wait
  //need to wait for the commenter information to arrive comments.comment.commenter
  console.log('comments.comment.commenter', props.comments)
  console.log('props.comment.updatedAt', props.comment.updatedAt)
  return (
    <article className={styles.commentCard}>
      <div className={styles.commenterSection}>
        {/* {props.comment.commenter.photo && (
          <div className={styles.namePhoto}>
            <img
              src={props.comment.commenter.photo}
              alt={`Photo of ${props.comment.commenter.name}`}
              className={styles.commenterPhoto}
            />
            <p className={styles.name}>{props.comment.commenter.name}</p>
          </div>
        )} */}
      </div>
      <div className={styles.commentText}>
        <p>{props.comment.text}</p>
        <p>{ratingEmojis}</p>
        <p>Date: {formatDate(props.comment.createdAt)}</p>
      </div> {/* Close the 'commentText' div here */}
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
