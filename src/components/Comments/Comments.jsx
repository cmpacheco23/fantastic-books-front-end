import { useState } from "react";

import CommentCard from "../CommentCard/CommentCard";
import EditComment from "../EditComment/EditComment"
import NewComment from "../NewComment/NewComment";
const Comments = (props) => {

  const [isEditingComment, setIsEditingComment] = useState(null)

  const handleCommentUpdate = (commentId, updatedData) => {
    // Update the comments state
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId ? { ...comment, ...updatedData } : comment
      )
    )
    setIsEditingComment(null);
  }
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
          handleEditComment={() =>
            isEditingComment === comment._id
              ? setIsEditingComment(null)
              : setIsEditingComment(comment._id)
          }
          handleDeleteComment={props.handleDeleteComment}
          isEditingComment={isEditingComment} // Pass isEditingComment to CommentCard
        />
      ))}
        {isEditingComment && (
            <EditComment
            volumeId={props.volumeId}
            commentId={isEditingComment}
            initialFormData={props.comment}
            onCommentUpdate={handleCommentUpdate}
            />
          )}
    </div>
  );
}

export default Comments;
