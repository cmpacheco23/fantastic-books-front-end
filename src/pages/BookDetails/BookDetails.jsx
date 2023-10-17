import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import * as bookService from '../../services/bookService'
import { Link } from "react-router-dom";

//components
import Comments from "../../components/Comments/Comments"
import NewComment from "../../components/NewComment/NewComment"

const BookDetails = (props) => {
  const { volumeId } = useParams()
  const [book, setBook] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await bookService.getBookDetails(volumeId);
        setBook(bookData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBook();
  }, [volumeId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await bookService.createComment(volumeId, commentFormData);
    setComments([...comments, newComment]); // Update the comments state
  };
  

  return (
    <main>
      <div className={styles.spacer}></div>
      {book ? (
      <div className={styles.info}>
        <h1>{book.title}</h1>
      <div className={styles.sideBySide}>
        <img className={styles.cover} src={book.cover} alt="book cover" />
        <div className={styles.bookInfo}>
          <h3>{book.subtitle}</h3>
          <h3>Author: {book.authors}</h3>
          <p>Pages: {book.pages}</p>
          <p>Published: {book.published}</p>
          <p>Categories: {book.categories}</p>

          <div dangerouslySetInnerHTML={{ __html: book.description || "" }}></div>

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
      <section>
        <h1>Comments</h1>
        {book ? (
          <div>
            <NewComment handleAddComment={handleAddComment} />
            <Comments comments={book.comments} user={props.user} />
          </div>) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  );
};

export default BookDetails;
