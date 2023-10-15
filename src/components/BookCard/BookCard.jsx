import { Link } from "react-router-dom"

const BookCard = (props) => {
  return (
    <div className="link-container">
      <Link to={`/books/${props.book._id}`}>
        {props.book.name}
      </Link>
    </div>
  )
}

export default BookCard