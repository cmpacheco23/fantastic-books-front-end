import { useState } from "react"
import styles from './NewComment.module.css'

const NewComment = (props) => {
  const [formData, setFormData] = useState({ text: '', rating: 5 });
  const [formOpen, setFormOpen] = useState(true);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  }

  console.log('FORMDATA OUTSIDE',formData)
  //this works
  // console.log('props.comments[0]',props.comments[0] )
  //this is what I need to render on the new comment
  // console.log('props.comments[0] COMMENTER NAME',props.comments[0].commenter.name )
  //this works
  // console.log('props.comments.',props.comments)
  //this doesnt work
  // console.log('props.comments.comment',props.comments.comment)
  //this doesnt work
  // console.log('props.comments.comment._id',props.comments.comment._id)
  // console.log('props.comments.comment._id',props.comments.comment._id)
  const handleSubmit = (evt) => {
    setFormOpen(false);
    evt.preventDefault();
    //this is where I set the comments to show new first
    //THIS IS COMING IN AS UNDEFINED
    //the issue is formData - its not defined
    console.log('FORMDATA', props.setComments([formData]))
    props.setComments([formData, ...props.comments])
    // console.log('FORMDATA', props.setComments([formData, ...props.comments]))
    props.handleAddComment(formData);
    setFormData({ text: '', rating: 5 });
    const delay = 2000; 
    setTimeout(() => {
      setFormOpen(true);
    }, delay);

  }

  return (
    <div>
      {formOpen ? (
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
          <button className={styles.submit} type="submit">Submit</button>
        </form>
      ) : 
      <h2> Thanks for submitting your comment!</h2>
      }
      
    </div>
  );
}

export default NewComment;
