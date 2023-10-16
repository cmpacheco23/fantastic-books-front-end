import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import BookDetails from "../../pages/BookDetails/BookDetails"

import styles from "./BookCard.module.css"


const BookCard = (props) => { 
  location = useLocation()
  const [bookInfo, setBookInfo] = useState(location.state?.book || null)
  const handleBookInfo = () =>{
    setBookInfo(!bookInfo)
  }
  
  return (
    <div className={styles.linkContainer}>
      <Link to={`/${props.book.id}`}>
        <img src={props.book.cover} alt="cover-img" />
        <h4>{props.book.title}</h4>
        <h5>{props.book.authors}</h5>
      </Link>
      <div onClick={handleBookInfo}>
      {bookInfo && <BookDetails bookInfo={bookInfo}/>}
      </div>
    </div>
  )
}

export default BookCard