import CommentCard from "../CommentCard/CommentCard";
import EditComment from "../EditComment/EditComment"
import NewComment from "../NewComment/NewComment";
const Comments = (props) => {
  if (!props.comments.length) {
    return <h4>No Comments</h4>;
  }

  return (
    <div>
      <NewComment handleAddComment={props.handleAddComment}/>  
      {props.comments.map((comment) => (
        <CommentCard 
          key={comment._id} 
          comment={comment} 
          user={props.user}
          volumeId={props.volumeId}
          handleEditComment={props.handleEditComment}
          handleDeleteComment={props.handleDeleteComment}

        />
        ))}
        <EditComment
          volumeId={props.volumeId}
          commentId={props.commentId}
          initialFormData={props.comment}
        />  
    </div>
  );
}

export default Comments;
