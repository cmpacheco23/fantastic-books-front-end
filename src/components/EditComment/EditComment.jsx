import { useState, useEffect } from "react";

import * as bookService from '../../services/bookService'

import styles from "./EditComment.module.css"
const  EditComment = (props) => {

  const { volumeId, setFormOpen,  handleCancelEdit, commentSavedUpdateRender, formOpen, commentSelect, handleUpdateComment, comment  } = props
  // const [formData, setFormData] = useState(props.comment)

  const [formData, setFormData] = useState({
    text: commentSelect?.text,
    rating: commentSelect?.rating,
  })

  const commentId = comment._id
  const handleChange = ({target}) => {
    console.log(target.name, target.value)
    setFormData({...formData, [target.name]: target.value})
  }

  useEffect(() => {
    // Update formData when the comment prop changes
    setFormData({
      text: comment?.text,
      rating: comment?.rating,
    });
  }, [comment]);

  const handleSubmit = async (evt) => {
    setFormOpen(false)
    evt.preventDefault();
    console.log("Submitting with:", volumeId, commentId, formData);
    await bookService.updateComment(volumeId, commentId, formData)
    commentSavedUpdateRender(commentId, formData)
    handleUpdateComment()
    // handleCommentUpdate()
  }
  
  const handleCancel = () => {
    setFormOpen(false);
    handleCancelEdit()
  }

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
        <div> </div>
      )
    }
    </div>
  );
}

export default EditComment