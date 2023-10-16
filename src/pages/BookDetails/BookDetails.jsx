import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import * as googleService from '../../services/googleService'

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Make an API request to fetch book details based on bookId
        const bookData = await googleService.getBookDetails(bookId);
        setBook(bookData);
      } catch (error) {
        console.error(error);
        // Handle the error as needed
      }
    };

    fetchBook(); // Call the function to fetch book details

  }, [bookId]);

  return (
    <main>
      {book ? (
        <div>
          <h1>{book.title}</h1>
          <p>Author: {book.authors}</p>
          {/* Add more details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default BookDetails;
