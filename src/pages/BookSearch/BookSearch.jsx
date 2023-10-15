import { useState, useEffect } from "react"
import SearchForm from "../../components/SearchForm/SearchForm"
import BookCard from "../../components/BookCard/BookCard"
import * as googleService from "../../services/googleService"

const BookSearch = () => {
  const [allBooks, setAllBooks] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [errMsg, setErrMsg] = useState("")

  // useEffect(() => {
  //   const fetchBookList = async () => {
  //     const bookData = await googleService.bookSearch()
  //     console.log(bookData)
  //     setAllBooks(bookData)
  //   }
  //   fetchBookList()
  // }, [])
  
  const handleBookSearch = async(formData) => {
    const bookData = await googleService.bookSearch(formData)
    console.log(bookData)
    setAllBooks(bookData)
    // const filteredBookResults = allBooks.items.filter(book => (
      //   // book.volume.items.title.includes(formData.query)
      //   data.title.toLowerCase().includes(formData.query.toLowerCase())
      // ))
      // if(!filteredBookResults.length) {
        //   setErrMsg('No matches for that query')
        // } else {
          //   setErrMsg('')
          // }
          // setSearchResults(filteredBookResults)
        }
  console.log(allBooks)
        
  return ( 
    <main className="book-list">
      <h1>Books</h1>
      {errMsg && <h2>{errMsg}</h2>}
      <SearchForm handleBookSearch={handleBookSearch} />
      { searchResults.length ?
        <h2>{searchResults.length} results found</h2>
        :
        <h2>Please search for a book</h2>
      }
      {searchResults.map(book => 
        <BookCard key={book._id} book={book} />
      )}
    </main>
  )
}

export default BookSearch