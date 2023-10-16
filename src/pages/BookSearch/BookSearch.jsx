import { useState } from "react";
import styles from "./BookSearch.module.css";
import BookCard from "../../components/BookCard/BookCard";
import BookDetails from "../BookDetails/BookDetails";

const BookSearch = (props) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <main className={styles.bookList}>
      {/* <div className={styles.spacer}></div> */}
      <h1>Books</h1>
      {props.allBooks.length ? (
        <h2>{props.allBooks.length} results found</h2>
      ) : (
        <h2>Please search for a book</h2>
      )}
      {props.allBooks.map((book) => (
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
