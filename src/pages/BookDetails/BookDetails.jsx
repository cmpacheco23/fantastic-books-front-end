import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import * as googleService from '../../services/googleService';

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
        <div>
          <h1>{book.title}</h1>
          {/* <p>Author: {book.authors}</p> */}
          {/* Add more details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default BookDetails;
