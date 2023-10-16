import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import * as googleService from '../../services/googleService'
import * as bookService from '../../services/bookService'
import { Link } from "react-router-dom";

//components
import Comments from "../../components/Comments/Comments"
import NewComment from "../../components/NewComment/NewComment"

const BookDetails = (props) => {
  const { volumeId } = useParams()
  const [book, setBook] = useState(null)
  // const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await googleService.getBookDetails(volumeId);
        setBook(bookData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBook();
  }, [volumeId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await googleService.createComment(volumeId, commentFormData)
    setBook({...book, comments: [...book.comments, newComment]})
  }

  return (
    <main>
      <div className={styles.spacer}></div>
      {book ? (
        <div>
          <h1>{book.title}</h1>
          <img src={book.cover} alt="book cover" />
          <h3>{book.subtitle}</h3>
          <h3>Author: {book.authors}</h3>
          <p>Pages: {book.pages}</p>
          <p>Published: {book.published}</p>
          <p>Categories: {book.categories}</p>
          <p>Description: {book.description}</p>
          <Link to={book.url}>
          <button>Learn More</button>
          </Link>
          {/* Add more details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <section>
        <h1>Comments</h1>
        <NewComment handleAddComment={handleAddComment}/>
        <Comments user={props.user}/>
      </section>
    </main>
  );
};

export default BookDetails;
