import { useState } from "react";

import CommentCard from "../CommentCard/CommentCard";
import EditComment from "../EditComment/EditComment"
import NewComment from "../NewComment/NewComment";
const Comments = (props) => {

  const [isEditingComment, setIsEditingComment] = useState(null)
  const [formOpen, setFormOpen] = useState(true)

  const handleCancelEdit = () => {
    setIsEditingComment(null)
  };

  return (
    <div>
      {props.comments.length > 0 ? (
        <>
        <NewComment handleAddComment={props.handleAddComment} />
        <h4>Read the comments below</h4>
        </>
      ): (
        <>
        <h4>No Comments Have Been Added Yet</h4>
        <NewComment handleAddComment={props.handleAddComment} />
        </>
      )}

      {props.comments.map((comment) => (
        <CommentCard 
          key={comment._id} 
          comment={comment} 
          user={props.user}
          volumeId={props.volumeId}
          handleEditComment={(commentId) => {
            setIsEditingComment(commentId)
            setFormOpen(true)
          }}
          handleDeleteComment={async () => {
            await props.handleDeleteComment(props.volumeId, comment._id);
            }}
            isEditingComment={isEditingComment} 
            handleCancelEdit={handleCancelEdit} 
        />
      ))}
        {isEditingComment && (
            <EditComment
            volumeId={props.volumeId}
            commentId={isEditingComment}
            user={props.user}
            onCommentUpdate={props.handleCommentUpdate}
            handleCancelEdit={handleCancelEdit}
            comment={props.comments.find((comment) => comment._id === isEditingComment)}
            formOpen={formOpen}
            />

          )}
    </div>
  );
}

export default Comments;
