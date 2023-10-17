import CommentCard from "../CommentCard/CommentCard";
import EditComment from "../EditComment/EditComment"
import NewComment from "../NewComment/NewComment";
const Comments = (props) => {
  if (!props.comments.length) {
    return <h4>No Comments</h4>;
  }

  return (
    <div>
      <NewComment handleAddComment={handleAddComment}/>  
      {props.comments.map((comment) => (
        <CommentCard 
          key={comment._id} 
          comment={comment} 
          user={props.user}
          volumeId={props.volumeId}

        />
        ))}
        <EditComment
          volumeId={volumeId}
          commentId={editCommentData.commentId}
          initialFormData={editCommentData.comment}
        />  
    </div>
  );
}

export default Comments;
