import { useState } from "react";

import CommentCard from "../CommentCard/CommentCard";
import EditComment from "../EditComment/EditComment"
import NewComment from "../NewComment/NewComment";
const Comments = (props) => {

  const [isEditingComment, setIsEditingComment] = useState(null)

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
          handleEditComment={() => setIsEditingComment(comment._id)}
          handleDeleteComment={props.handleDeleteComment}

        />
        ))}
        {isEditingComment && (
            <EditComment
            volumeId={props.volumeId}
            commentId={isEditingComment}
            initialFormData={props.comment}
            />
          )}
    </div>
  );
}

export default Comments;
