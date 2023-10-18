import styles from "./CommentCard.module.css"

const CommentCard = (props) => {

  // console.log('isEditingComment:', props.isEditingComment);
  // console.log('comment._id:', props.comment._id);
  return (
    <article>
      <p>{props.comment.commenter.name}</p>
      <p>{props.comment.text}</p>
      <p>{props.comment.rating}</p>
      <p>{props.comment.createdAt}</p>
      
      
      <div>

        <button
          onClick={() => 

            props.handleEditComment(props.volumeId, props.comment._id)}
          disabled={props.isEditingComment === props.comment._id}
        >
          Edit
        </button>

        <button
          onClick={() => props.handleDeleteComment(props.volumeId, props.comment._id)}
          disabled={props.isEditingComment === props.comment._id}
        >
          Delete
        </button>


        
      </div>
  
</article>
);
}

export default CommentCard;


  // { comment, volumeId, handleDeleteComment, handleEditComment, isEditingComment, formOpen }