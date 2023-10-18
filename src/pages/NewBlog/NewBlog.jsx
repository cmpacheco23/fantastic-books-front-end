// npm modules
import { useState } from "react"

// css
import styles from './NewBlog.module.css'

const NewBlog = (props) => {
  const [formData, setFormData] = useState({
    blogTitle: '',
    text: '',
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    props.handleAddBlog(formData)
    setFormData({title: '', text: ''})
  }

  return (
    <main className={styles.container}>
      <div className={styles.spacer}></div>
      <form className={styles.newBlogForm} onSubmit={handleSubmit}>
        <label htmlFor="blogTitle-input">Title</label>
        <input
          required
          type="text"
          name="blogTitle"
          id="blog-title-input"
          value={formData.title} //might need to be just title
          placeholder="Title"
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
				<textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          placeholder="Text"
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        {/* <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select> */}
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default NewBlog