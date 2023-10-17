const CommentCard = ({comment}) => {
  return ( 
    <article>
      <p>{comment.commenter.name}</p>
      <p>{comment.text}</p>
      <p>{comment.rating}</p>
    </article>
  )
}

export default CommentCard;