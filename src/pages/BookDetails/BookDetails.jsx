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
  
  const handleUpdateComment = async (volumeId, commentId, commentFormData) => {
    try {
      const updatedComment = await bookService.updateComment(volumeId, commentId, commentFormData);
      console.log(updatedComment)
      setComments(comments.map(comment => {
        updatedComment._id === comment._id ? updatedComment : comment
      }))
      // setComments((prevComments) => {
      //   return prevComments.map((comment) => {
      //     if (comment._id === commentId) {
      //       return { ...comment, ...commentFormData };
      //     }
      //     return comment;
      //   });
      // });
      
    } catch (error) {
      console.error(error);
    }
  };
  
  


  const handleDeleteComment = async (volumeId, commentId) => {
    await bookService.deleteComment(volumeId, commentId)
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    )
    setBook((prevBook) => {
      if (!prevBook || !prevBook.comments) {
        return prevBook
      }
      return {
        ...prevBook,
        comments: prevBook.comments.filter((comment) => comment._id !== commentId),
      }
    })
  }

  const commentSavedUpdateRender = async (commentId, updatedCommentData) => {
    // Update the comment in the state using the commentId
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id === commentId) {
          return { ...comment, ...updatedCommentData };
        }
        return comment;
      })
    );
  };


  return (
    <main>
      <div className={styles.spacer}></div>
      {book ? (
      <div className={styles.info}>
        <h1 className={styles.bookTitle}>{book.title}</h1>
      <div className={styles.sideBySide}>
        <img className={styles.cover} src={book.cover} alt="book cover" />
        <div className={styles.bookInfo}>
          <h3>{book.subtitle}</h3>
          <h3>Author: {book.authors}</h3>
          <p>Pages: {book.pages}</p>
          {book.published && ( 
          <p>Published: {book.published}</p>
        )}
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
      <section className={styles.commentContainerSection}>
        <h1 className={styles.commentH1}>Comments</h1>
        {book ? (
          <div>

            <Comments 
              key={comments._id} 
              comments={comments} 
              setComments={setComments}
              user={props.user} 
              handleEditComment={handleUpdateComment} 
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
              volumeId={volumeId} 
              commentSavedUpdateRender={commentSavedUpdateRender}
            />
          
          
          </div>) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  )
}

export default BookDetails
