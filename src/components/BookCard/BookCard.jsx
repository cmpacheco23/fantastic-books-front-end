import { Link} from "react-router-dom"
import styles from "./BookCard.module.css"

import BookDetails from "../../pages/BookDetails/BookDetails"

const BookCard = (props) => { 

  
  return (
    <div className={styles.linkContainer}>
      <Link to={`/${props.book.id}`} >
        <img src={props.book.cover} alt="cover-img" />
        <h4>{props.book.title}</h4>
        <h5>{props.book.authors}</h5>

      </Link>
    </div>
  )
}

export default BookCard