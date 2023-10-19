import { useState } from "react";

import CommentCard from "../CommentCard/CommentCard";
import EditComment from "../EditComment/EditComment"
import NewComment from "../NewComment/NewComment"

import styles from "./Comments.module.css"

const Comments = (props) => {
  const {comments, setComments} = useState(props.comments)
  const [isEditingComment, setIsEditingComment] = useState(null)
  const [formOpen, setFormOpen] = useState
  (true)
  
  const handleCancelEdit = () => {
    setIsEditingComment(null)
  };



  const selectedComment = props.comments.find((comment) => comment._id === comment._id)
  
  return (
    <div className={styles.commentTester}>
      {props.comments.length > 0 ? (
        <>
        <NewComment handleAddComment={props.handleAddComment} />
        <h4 className={styles.commentH4Title} >Read the comments below</h4>
        </>
      ): (
        <>
        <h4 className={styles.commentH4Title}>No Comments Have Been Added Yet</h4>
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
            isEditingComment={selectedComment} 
            handleCancelEdit={handleCancelEdit}
          commentSavedUpdateRender={props.commentSavedUpdateRender}   

        />
        
      ))}
        {isEditingComment && (
            <EditComment
            volumeId={props.volumeId}
            user={props.user}
            onCommentUpdate={props.handleCommentUpdate}
            handleCancelEdit={handleCancelEdit}
            comment={selectedComment || { text: '', rating: '1' }}
            formOpen={formOpen}
            setFormOpen={setFormOpen}
            commentSavedUpdateRender={props.commentSavedUpdateRender}
            />
          )}

          
    </div>
  );
}

export default Comments;
