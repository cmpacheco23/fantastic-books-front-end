import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import styles from "./BookDetails.module.css"
import * as bookService from '../../services/bookService'
import { Link } from "react-router-dom"
import * as profileService from '../../services/profileService'

//components
import Comments from "../../components/Comments/Comments"
import NewComment from "../../components/NewComment/NewComment"

const BookDetails = (props) => {
  const { volumeId } = useParams()
  const [book, setBook] = useState(null)
  const [comments, setComments] = useState([])
  const [shelves, setShelves] = useState([])
  const [selectedShelf, setSelectedShelf] = useState('')
  const [profile, setProfile] = useState({})
  const [modalData, setModalData] = useState({ isOpen: false, name: '', isEditing: false, id: null })
  const inputRef = useRef(null)


  useEffect(() => {
    const fetchShelves = async () => {
      const profileData = await profileService.getOneProfile(props.user.profile)
      setProfile(profileData)
      setShelves(profileData.shelves || [])
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

  useEffect(() => {
    if (modalData.isOpen && inputRef.current) inputRef.current.focus()
  }, [modalData.isOpen])

  //currently adds but doesnt update render of the comment card until you refresh the page
  // the new comment is being sent to the end
  const handleAddComment = async (commentFormData) => {
    const newComment = await bookService.createComment(volumeId, commentFormData)
    setBook({...book, comments: [...book.comments, newComment]})
  }

  const handleUpdateComment = async (volumeId, commentId, commentFormData) => {
    try {
      const updatedComment = await bookService.updateComment(volumeId, commentId, commentFormData);
      console.log(updatedComment)
      setComments(comments.map(comment => {
        updatedComment._id === comment._id ? updatedComment : comment
      }))
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleShelf = async () => {
    try {
      const newShelf = await profileService.createShelf({ name: modalData.name }, props.user.profile)
      setShelves(prev => [...prev, newShelf])
      setModalData({ isOpen: false, name: '', isEditing: false, id: null })
    } catch (err) { console.log(err) }
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
          {
            shelves.length === 0 ? (
              <>
                {/* Create New Shelf button */}
                <button onClick={() => setModalData({ isOpen: true, isEditing: false, name: '', id: null })}>Add New Shelf</button>

                {/* Create Shelf Modal */}
                {modalData.isOpen && (
                  <div className={styles.modalOpen}>
                    <label>Shelf Name:<input ref={inputRef} type="text" value={modalData.name} onChange={e => setModalData({ ...modalData, name: e.target.value })} /></label>
                    <button onClick={handleShelf}>Create</button>
                    <button onClick={() => setModalData({ isOpen: false, name: '', isEditing: false, id: null })}>Cancel</button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Dropdown to select a shelf */}
                <select id="shelfDropdown" onChange={handleSelectedShelf}>
                  <option value="">Select a shelf</option>
                  {shelves.map((shelf) => (
                    <option key={shelf._id} value={shelf._id}>
                      {shelf.name}
                    </option>
                  ))}
                </select>
                {/* Button to add book to selected shelf */}
                <button onClick={handleAddToShelf}>Add to Shelf</button>
              </>
            )
          }
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
          <NewComment handleAddComment={handleAddComment} comments={comments} user={props.user} setComments={setComments} />
          </div>) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  )
}

export default BookDetails