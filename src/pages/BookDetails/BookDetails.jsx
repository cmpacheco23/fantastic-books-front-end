import styles from "./BookDetails.module.css"

const BookDetails = (props) => {

  return (
    <main>
      <h1>{props.book.title}</h1>
    </main>
  )
}

export default BookDetails;