import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import * as googleService from '../../services/googleService';
import { Link } from "react-router-dom";

const BookDetails = () => {
  const { volumeId } = useParams()
  const [book, setBook] = useState(null)

  useEffect(() => {
    const fetchBook = async () => {
      try {

        const bookData = await googleService.getBookDetails(volumeId);
        setBook(bookData);
      } catch (error) {
        console.error(error)

      }
    }

    fetchBook()

  }, [volumeId])

  return (
    <main>
      <div className={styles.spacer}></div>
      {book ? (
      <div className={styles.info}>
        <h1>{book.title}</h1>
      <div className={styles.sideBySide}>
        <img src={book.cover} alt="book cover" />
        <div className={styles.bookInfo}>
          <h3>{book.subtitle}</h3>
          <h3>Author: {book.authors}</h3>
          <p>Pages: {book.pages}</p>
          <p>Published: {book.published}</p>
          <p>Categories: {book.categories}</p>
          <p>Description: {book.description}</p>
          <Link to={book.url}>
          <button>Learn More</button>
          </Link>
        </div>
      </div>
        {/* Add more details here */}
      </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default BookDetails;
