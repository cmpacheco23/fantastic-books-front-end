import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";

const BookCard = (props) => {
  return (
    <div className={styles.linkContainer}>
      <Link to={`/books/${props.book.id}`}>
        <img src={props.book.cover} alt="cover-img" />
        <h4>{props.book.title}</h4>
        <h5>{props.book.authors}</h5>
      </Link>
      {/* {props.onClick && (
        <button onClick={props.onClick}>Show Details</button>
      )} */}
    </div>
  );
};

export default BookCard;
