import { useState } from 'react'
import styles from './SearchForm.module.css'


const SearchForm = (props) => {
  const [formData, setFormData] = useState({searchTerm: ''})

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault()
    if (formData.searchTerm) {
      await props.handleBookSearch(formData)
    }
  }
  console.log(formData)
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input 
        type="text" 
        name="searchTerm" 
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