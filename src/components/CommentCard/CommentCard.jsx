const CommentCard = ({comment}) => {
  return ( 
    <article>
      {/* <p>{comment.commenter}</p> */}
      <p>{comment.text}</p>
      <p>{comment.rating}</p>
    </article>
  )
}

export default CommentCard;