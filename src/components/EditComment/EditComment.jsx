import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as bookService from '../../services/bookService'

import styles from "./EditComment.module.css"
const  EditComment = (props) => {

  const location = useLocation()
  const {state} = location

  const initialFormData = state || { text: '', rating: 1 }
  const [formData, setFormData] = useState(initialFormData)
  const [isFormOpen, setIsFormOpen] = useState(true)

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await bookService.updateComment(props.volumeId, props.commentId, formData)
    if (props.onCommentUpdate) {
      props.onCommentUpdate(props.commentId, formData);
    }
  }


  const handleCancel = () => {
    setIsFormOpen(false);
    props.handleCancelEdit()
  }

  return (
    <div>

      {isFormOpen && (
        <form className={styles.newComment} onSubmit={handleSubmit}>
          <h1>Edit Comment</h1>
          <label htmlFor="text-input">Comment</label>
          <textarea
            name="text"
            type="text"
            required
            id="text-input"
            value={formData.text}
            onChange={handleChange}
          />
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
          <label htmlFor="rating">Rating:</label>

          <button className={styles.submit} type="submit">Save</button>
          <button className={styles.cancel} type="button" onClick={handleCancel}>
            Cancel
          </button>

        </form>
    )}
    </div>
  );
}

export default EditComment