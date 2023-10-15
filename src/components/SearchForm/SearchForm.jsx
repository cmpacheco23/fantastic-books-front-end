import { useState } from 'react'
import styles from './SearchForm.module.css'


const SearchForm = (props) => {
  const [formData, setFormData] = useState({query: '',})

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    if (formData.query) {
      props.handleBookSearch(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input 
        type="text" 
        name="query" 
        autoComplete="off" 
        value={formData.query}
        onChange={handleChange}
        placeholder='Search for a book'
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchForm