import { useState } from "react"

import styles from './NewComment.module.css'


const NewComment = (props) => {
  const [formData, setFormData] = useState({text: '', rating: 5})
  const [formOpen, setFormOpen] = useState(true)
  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    setFormOpen(false)
    evt.preventDefault()
    props.handleAddComment(formData)
    setFormData({text: '', rating: 5})
    const delay = 2000;
    setTimeout(() => {
      setFormOpen(true)
    }, delay)
  }

  return (
    formOpen ? (
    <form className={styles.newComment} onSubmit={handleSubmit}>
      <h3>Add a new comment</h3>
      <div className={styles.inputRow}>
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
      </div>
      <textarea
        name="text"
        type="text"
        required
        id="text-input"
        value={formData.text}
        onChange={handleChange}
        placeholder="Add a Comment"
      />
      <button className={styles.b68}type="submit">Submit</button>
      

    </form>
    
  ) : (
  <h2> Thanks for submitting your comment!</h2>
  ) 
)
}

export default NewComment