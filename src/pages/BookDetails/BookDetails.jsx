import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import * as bookService from '../../services/bookService';
import { Link } from "react-router-dom";

//components
import Comments from "../../components/Comments/Comments"

const BookDetails = (props) => {
  const { volumeId } = useParams()
  const [book, setBook] = useState(null)
  const [comments, setComments] = useState([])


  useEffect(() => {
    const fetchBookData = async () => {
      try {

        const bookData = await bookService.getBookDetails(volumeId);
        setBook(bookData);

        const comments = await bookService.getComments(volumeId);
        setComments(comments);

      } catch (error) {
        console.error(error);
      }
    }
    fetchBookData();
  }, [volumeId]);

  
  const handleAddComment = async (commentFormData) => {
    const newComment = await bookService.createComment(volumeId, commentFormData);
  
    if (newComment) {
      // Add the new comment to the existing comments
      setComments((prevComments) => [...prevComments, newComment]);
      
      setBook((bookExists) => {
        if (!bookExists || !bookExists.comments) {
          return bookExists;
        }
        return { ...bookExists, comments: [...bookExists.comments, newComment] };
      })
    }
  }
  
  const handleEditComment = async (volumeId, commentId, commentFormData) => {
    console.log('commentform in bookdetails', commentFormData)
    const updatedComment = await bookService.updateComment(volumeId, commentId, commentFormData)
    setComments((existingComments) => {
      return existingComments.filter(comment => comment._id === commentId ? updatedComment : comment._id
    )})
  }

  const handleCommentUpdate = (commentId, updatedData) => {
    // Update the comments state
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId ? { ...comment, ...updatedData } : comment
      )
    );
  };

  const handleDeleteComment = async (volumeId, commentId) => {
    await bookService.deleteComment(volumeId, commentId)
    setBook({ ...book, comments: book.comments.filter((comment) => comment._id !== commentId) })
  }

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

          <div className={styles.description} dangerouslySetInnerHTML={{ __html: book.description || "" }}></div>

          <Link to={book.url}>
          <button>Learn More</button>
          </Link>
        </div>
      </div>
      </div>
      ) : (
        <p>Loading...</p>
      )}
      <section className={styles.commentCard}>
        <h1>Comments</h1>
        {book ? (
          <div>

            <Comments 
              key={comments.id} 
              comments={comments} 
              user={props.user} 
              handleEditComment={handleEditComment} 
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
              volumeId={volumeId} 
            />
          
          
          </div>) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  )
}

export default BookDetails
