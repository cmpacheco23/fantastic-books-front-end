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
    evt.preventDefault();
    console.log("Submitting with:", volumeId, commentId, formData);
    await handleUpdateComment(volumeId, commentId, formData)
    setFormOpen(false)
  }
  
  const handleCancel = () => {
    setFormOpen(false);
    handleCancelEdit()
  }
  
  return (
    <div className={formOpen ? styles.visible : styles.hidden}>
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

        <button className={styles.submit} type="submit" onClick={handleSubmit}>Save</button>
        <button className={styles.cancel} type="button" onClick={handleCancel}>
          Cancel
        </button>
        
        </div>
      </form>
    </div>
  );
}

export default EditComment