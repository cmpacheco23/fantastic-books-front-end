import { useState } from "react";

import CommentCard from "../CommentCard/CommentCard";
import EditComment from "../EditComment/EditComment"
import NewComment from "../NewComment/NewComment"

import styles from "./Comments.module.css"

const Comments = (props) => {

  const [isEditingComment, setIsEditingComment] = useState(null)
  const [formOpen, setFormOpen] = useState
  (true)
  const [selectedComment, setSelectedComment] = useState({})

  const handleCancelEdit = () => {
    setIsEditingComment(null)
  };

  const sortedComments = props.comments.slice().sort((a, b) => {
    // You can customize the sorting logic here
    return new Date(b.createdAt) - new Date(a.createdAt);
  })

  
  console.log('PROPS COMMENTS 26', props.comments)
    //array method to find the comment in the comments array where the id matches comment._id





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

      {sortedComments.map((comment) => (
        <CommentCard 
          key={`edit-${comment._id}`} 
          comment={comment} 
          user={props.user}
          volumeId={props.volumeId}
    
          handleToggleEditForm={() => {
            setIsEditingComment(comment._id)
            setFormOpen(true)
            setSelectedComment(props.comments.find(element => element._id === comment._id))
            //array method to find the comment in the comments array where the id matches comment._id
            //pontentially find?
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
            handleEditComment={props.handleEditComment}
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
