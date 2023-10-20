import { useState } from "react";
import { useParams } from "react-router-dom";

import * as bookService from '../../services/bookService'

import styles from "./EditComment.module.css"
const  EditComment = (props) => {

  // ('Received props in EditComment:', props)

  const {volumeId} = useParams()
  // const {commentId} = props
  const {setFormOpen} = props
  const [formData, setFormData] = useState(props.comment)

  const commentId = props.comment._id
  const handleChange = ({target}) => {
    //updates state in real time
    setFormData({...formData, [target.name]: target.value})
  }

  const handleSubmit = async (evt) => {
    setFormOpen(false)
    evt.preventDefault();
    await bookService.updateComment(volumeId, commentId, formData)
    props.commentSavedUpdateRender(commentId, formData)
  }
  
  const handleCancel = () => {
    setFormOpen(false);
    ('After setting isFormOpen to false in handleCancel')
    props.handleCancelEdit()
  }

  return (
    <div>
      
      {props.formOpen ?  (
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