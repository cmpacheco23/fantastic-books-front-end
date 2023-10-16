import { useState } from "react"
import SearchForm from "../../components/SearchForm/SearchForm"
import BookCard from "../../components/BookCard/BookCard"
import * as googleService from "../../services/googleService"
import styles from "./BookSearch.module.css"

const BookSearch = () => {
  const [allBooks, setAllBooks] = useState([])
  // const [errMsg] = useState("")

  const handleBookSearch = async(formData) => {
    const bookData = await googleService.bookSearch(formData)
    setAllBooks(bookData)
    }
  console.log(allBooks)
        
  return ( 
    <main className={styles.bookList}>
      <div className={styles.spacer}></div>
      <h1>Books</h1>
      <SearchForm handleBookSearch={handleBookSearch} />
      { allBooks.length ?
        <h2>{allBooks.length} results found</h2>
        :
        <h2>Please search for a book</h2>
      }
      {allBooks.map(book => 
        <BookCard key={book.id} book={book} />
        )}
    </main>
  )
}

export default BookSearch