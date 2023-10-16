import styles from "./BookDetails.module.css"

const BookDetails = ({bookInfo}) => {

  if(!bookInfo){
    return (
    <main>
      <p>Loading...</p>
    </main>)
  }

  return (
    <main>
      <h1>{bookInfo.title}</h1>
    </main>
  )
}

export default BookDetails;