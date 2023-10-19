import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./BookDetails.module.css"
import * as bookService from '../../services/bookService'
import { Link } from "react-router-dom"
import * as profileService from '../../services/profileService'

//components
import Comments from "../../components/Comments/Comments"

const BookDetails = (props) => {
  const { volumeId } = useParams()
  const [book, setBook] = useState(null)
  const [comments, setComments] = useState([])
  const [shelves, setShelves] = useState([])
  const [selectedShelf, setSelectedShelf] = useState('')
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const fetchShelves = async () => {
      const profileData = await profileService.getOneProfile(props.user.profile)
      setProfile(profileData)
      setShelves(profileData.shelves || [])
      setSelectedShelf(profileData.shelves[1]._id)
    }
    fetchShelves()
  }, [])

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookData = await bookService.getBookDetails(volumeId)
        setBook(bookData)
        const comments = await bookService.getComments(volumeId)
        setComments(comments)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBookData()
  }, [volumeId])

  const handleAddComment = async (commentFormData) => {
    const newComment = await bookService.createComment(volumeId, commentFormData)
    if (newComment) {
      setComments((prevComments) => [...prevComments, newComment])
      setBook((bookExists) => {
        if (!bookExists || !bookExists.comments) {
          return bookExists
        }
        return { ...bookExists, comments: [...bookExists.comments, newComment] }
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
  
  const handleSelectedShelf = (event) => {  
    setSelectedShelf(event.target.value )
  }

  const handleAddToShelf = async () => {
    console.log(selectedShelf)
    try {
      console.log(props.user.profile, selectedShelf, volumeId)
      const profileData = await profileService.addBookToShelf(props.user.profile, selectedShelf, volumeId)
      setProfile(profileData)
      setShelves(profileData.shelves || [])
      alert("Book added to shelf!")
    } catch (error) {
      console.error(error)
      alert("Failed to add the book to shelf.")
    }
  }


  return (
    <main>
      <div className={styles.spacer}></div>
      {book ? (
      <div className={styles.info}>
        <h1 className={styles.bookTitle}>{book.title}</h1>
      <div className={styles.sideBySide}>
        <img className={styles.cover} src={book.cover} alt="book cover" />
        <div className={styles.bookInfo}>
        <select id="shelfDropdown" onChange={handleSelectedShelf}>
          <option value="">Select a shelf</option>
          {shelves.map(shelf => <option key={shelf._id} value={shelf._id}>{shelf.name}</option>)}
        </select>
        <button onClick={handleAddToShelf}>Add to Shelf</button>
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
              // commentSavedUpdateRender={commentSavedUpdateRender}
            />
          
          
          </div>) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  )
}

export default BookDetails