import { useState } from "react";
import styles from "./BookSearch.module.css";
import BookCard from "../../components/BookCard/BookCard";
import BookDetails from "../BookDetails/BookDetails";
import * as googleService from '../../services/googleService'

const BookSearch = (props) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [formData, setFormData] = useState({ searchTerm: '' });

  const handleBookSearch = async (formData) => {
    const bookData = await googleService.bookSearch(formData);
    setAllBooks(bookData);
  };

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (formData.searchTerm) {
      await handleBookSearch(formData);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <main className={styles.bookList}>
      <div className={styles.spacer}>spacer</div>
      <h1>Books</h1>
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
