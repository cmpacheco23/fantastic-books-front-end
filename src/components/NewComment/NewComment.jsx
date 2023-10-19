import { useState } from "react"

import styles from './NewComment.module.css'


const NewComment = (props) => {
  const [formData, setFormData] = useState({text: '', rating: 5})

  const handleChange = ({target}) => {
    setFormData({...formData, [target.name]: target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddComment(formData)
    setFormData({text: '', rating: 5})
  }
//when i passed in state comments are now duplicating: 2pm
  return (
    <form className={styles.newComment} onSubmit={handleSubmit}>
      {props.comments.length > 0 ? (
        <h4 className={styles.commentH4Title}>Read the comments below</h4>
      ) : (
        <h4 className={styles.commentH4Title}>No Comments Have Been Added Yet</h4>
      )}
      <h3>Add New Comment</h3>
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
      <textarea
        required
        type="text"
        name="text"
        value={formData.text}
        placeholder="Add a Comment"
        onChange={handleChange}
      />
      <button className={styles.submit}type="submit">Submit</button>

    </form>
  )
}

export default NewComment