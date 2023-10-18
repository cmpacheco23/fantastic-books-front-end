import { useState } from "react";
import styles from "./BookSearch.module.css";
import BookCard from "../../components/BookCard/BookCard";
import BookDetails from "../BookDetails/BookDetails";
import * as bookService from '../../services/bookService'

const BookSearch = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [formData, setFormData] = useState({ searchTerm: '' });
  const [currPage, setCurrPage] = useState(1)
  const [startIndex, setStartIndex] = useState(0)

  const handleBookSearch = async (formData) => {
    formData.startIndex = startIndex
    const bookData = await bookService.bookSearch(formData);
    setAllBooks(bookData);
  };

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  //error happening here:
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (formData.searchTerm) {
      setCurrPage(1)
      setStartIndex(0)
      await handleBookSearch(formData);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleIncreasePageCount = async () => {
    setCurrPage(currPage + 1)
    setStartIndex(startIndex + 10)
    await handleBookSearch({...formData})
  }

  const handleDecreasePageCount = async () => {
    setCurrPage(currPage - 1)
    setStartIndex(startIndex - 10)
    await handleBookSearch({...formData})
  }

  return (
    <main className={styles.bookList}>
      <div className={styles.spacer}>spacer</div>
      <h1>Books</h1>
      <div className={styles.paginationContainer}>
        {currPage > 1 && <h2 onClick={handleDecreasePageCount}>◄</h2>}
        <h2>Page {currPage}</h2>
        <h2 onClick={handleIncreasePageCount}>►</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            name="searchTerm"
            autoComplete="off"
            value={formData.searchTerm}
            onChange={handleChange}
            placeholder='Search for a book'
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {allBooks.length ? (
        <h2>{allBooks.length} results found</h2>
      ) : (
        <h2>Please search for a book</h2>
      )}
      {allBooks.map((book) => (
        <div key={book.id}>
          <BookCard book={book} onClick={() => handleBookClick(book)} />
          {selectedBook && selectedBook.id === book.id && (
            <BookDetails book={selectedBook} />
          )}
        </div>
      ))}
    </main>
  );
};

export default BookSearch;
