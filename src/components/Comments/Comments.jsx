import CommentCard from "../CommentCard/CommentCard";

const Comments = ({comments, handleEditComment, volumeId}) => {
  if (!comments.length) {
    return <h4>No Comments</h4>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <CommentCard 
          key={comment._id} 
          comment={comment} 
          onEditClick={(commentId, commentFormData) => handleEditComment(commentId, volumeId, commentFormData)}
          volumeId={volumeId}

        />

      ))}
    </div>
  );
}

export default Comments;
