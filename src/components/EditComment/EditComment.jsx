import { useState, useEffect } from "react";

import styles from "./EditComment.module.css"
const  EditComment = (props) => {

  const { volumeId, setFormOpen,  handleCancelEdit, formOpen, selectedComment, handleUpdateComment, comment  } = props
  const [formData, setFormData] = useState({
    text: comment?.text,
    rating: comment?.rating,
  })

  const commentId = comment._id
  const handleChange = ({target}) => {
    setFormData({...formData, [target.name]: target.value})
  }

  useEffect(() => {
    // Update formData when the comment prop changes
    setFormData({
      text: selectedComment?.text,
      rating: selectedComment?.rating,
    });
  }, [selectedComment]);

  const handleSubmit = async (evt) => {
    // setFormOpen(false)
    evt.preventDefault();
    console.log("Submitting with:", volumeId, commentId, formData);
    await handleUpdateComment(volumeId, commentId, formData)
    // handleCommentUpdate()
    setFormOpen(false)
  }
  
  const handleCancel = () => {
    setFormOpen(false);
    handleCancelEdit()
  }

  function getRatingEmojis(rating) {
    if (rating < 1 || rating > 5) {
      return 'Invalid Rating';
    }
    return '⭐'.repeat(rating);
  }
  
  const ratingEmojis = getRatingEmojis(props.comment.rating);
  
  return (
    <div>

      {formOpen ?  (
        <form className={styles.newComment} onSubmit={handleSubmit}>
        <h1>Edit Comment</h1>
        <div className={styles.dropdown}> 
          <label htmlFor="rating" className={styles.dropdownLabel}>Rating:</label>
          <select
            name="rating"
            id="rating"
            className={styles.dropdownSelect} 
            value={formData.rating}

            onChange={handleChange}
          >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        </div>

        <textarea
          required
          name="text"
          type="text"
          id="text-input"
          value={formData.text}

          onChange={handleChange}
        />
        <div className={styles.btnRow}>

        <button className={styles.submit} type="submit" >Save</button>
        <button className={styles.cancel} type="button" onClick={handleCancel}>
          Cancel
        </button>
        
        </div>
      </form>
      ) : (
        <div> 
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
          <p className={styles.commentText}>{props.comment.text}</p>
          <p className={styles.date}>{props.formatDate(props.comment.createdAt)}</p>
          <p>{ratingEmojis}</p>
        </div>
      )
    }
    </div>
  );
}

export default EditComment