import { useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./EditComment.module.css"
const EditComment = (props) => {

  const {state} = useLocation()

  const [formData, setFormData] = useState(state)

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleEditComment(formData)
    
  }

  return (
    <form className={styles.newComment} onSubmit={handleSubmit}>
    <textarea
      name="text"
      type="text"
      required
      id="text-input"
      value={formData.text}
      //because we are getting it from state ^^
      onChange={handleChange}
      placeholder="Add a Comment"
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