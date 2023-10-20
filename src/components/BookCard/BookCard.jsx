import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";

const BookCard = (props) => {
  return (
    <div className={`${styles.linkContainer} ${styles.bookCardContent}`}>
      <Link to={`/books/${props.book.id}`} className={styles.authorLink}>
        <img className={styles.bookCardImage} src={props.book.cover} alt="cover-img" />
        <h4 className={styles.bookCardText} >{props.book.title}</h4>
        <h5>{props.book.authors}</h5>
      </Link>
    </div>
  )
}

export default BookCard;
