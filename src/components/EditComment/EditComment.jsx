import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as bookService from '../../services/bookService'

import styles from "./EditComment.module.css"
const EditComment = (props) => {

  const location = useLocation()
  const {state} = location()

  const [formData, setFormData] = useState(state)

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await bookService.updateComment(volumeId, commentId, formData)
    if (props.commentId) {
      // Editing an existing comment
      console.log('formData:', formData)
      // await bookService.updateComment(props.volumeId, props.commentId, formData);
      // props.handleEditComment(props.commentId, props.volumeId, formData);
    }
  }

  return (
    <form className={styles.newComment} onSubmit={handleSubmit}>
      <h1>Edit Comment</h1>
      <label htmlFor="text-input">Comment</label>
      <textarea
        name="text"
        type="text"
        required
        id="text-input"
        value={formData.text}
        placeholder={formData.text}
        onChange={handleChange}
      />
      <label htmlFor="rating">Rating:</label>
      <select
        name="rating"
        id="rating"
        value={formData.rating}
        onChange={handleChange}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <button className={styles.submit}type="submit">Submit</button>

    </form>
  );
}

export default EditComment