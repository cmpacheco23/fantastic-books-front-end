import { useState } from "react";

import CommentCard from "../CommentCard/CommentCard";
import NewComment from "../NewComment/NewComment"
import EditComment from "../EditComment/EditComment"

import styles from "./Comments.module.css"

const Comments = (props) => {

  // const [formOpen, setFormOpen] = useState(true)
  const [selectedComment, setSelectedComment] = useState(null)
  const [isEditingComment, setIsEditingComment] = useState(false)


  const sortedComments = props.comments.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)})

  const handleCancelEdit = () => {
    setIsEditingComment(null)
  }
  
  const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  return (
    <div className={styles.commentTester}>
      <NewComment user={props.user} handleAddComment={props.handleAddComment} />
      {props.comments.length > 0 ? (
        <>
        <h4 className={styles.commentH4Title} >Read existing comments below</h4>
        </>
      ): (
        <>
        <h4 className={styles.commentH4Title}>No Comments Have Been Added Yet</h4>
        </>
      )}
      {isEditingComment ? (
        <EditComment
          volumeId={props.volumeId}
          comment={props.comment}
          user={props.user}
          handleUpdateComment={props.handleUpdateComment}
          handleCancelEdit={handleCancelEdit}
          selectedComment={props.selectedComment}
          // formOpen={props.formOpen}
          // setFormOpen={props.setFormOpen}
          formatDate={formatDate}
        />
        ):(
        <div className={styles.commentCardContainer}>
        {sortedComments.map((comment) => (
          <CommentCard 
          onEdit={() => setIsEditingComment(true)}
          key={`edit-${comment._id}`} 
          comment={comment} 
          comments={props.comments}
          user={props.user}
          volumeId={props.volumeId}
          setSelectedComment={setSelectedComment}
          // formOpen={formOpen}
          handleDeleteComment={async () => {
            await props.handleDeleteComment(
              props.volumeId,
              comment._id);}}
            handleUpdateComment={props.handleUpdateComment}
          selectedComment={selectedComment}
          // setFormOpen={setFormOpen}
          setIsEditingComment={setIsEditingComment}
          isEditingComment={isEditingComment}
          formatDate={formatDate}
          />
          ))}
      </div>
      )}
    </div>
  )
}

export default Comments;
