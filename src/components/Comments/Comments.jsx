import { useState } from "react";

import CommentCard from "../CommentCard/CommentCard";
import NewComment from "../NewComment/NewComment"

import styles from "./Comments.module.css"

const Comments = (props) => {

  // const [isEditingComment, setIsEditingComment] = useState(null)
  const [formOpen, setFormOpen] = useState(true)
  const [selectedComment, setSelectedComment] = useState(null)

  // const handleCancelEdit = () => {
  //   setIsEditingComment(null)
  // }

  const sortedComments = props.comments.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)})

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
      <div className={styles.commentCardContainer}>
      {sortedComments.map((comment) => (
        <CommentCard 
          key={`edit-${comment._id}`} 
          comment={comment} 
          comments={props.comments}
          user={props.user}
          volumeId={props.volumeId}
          setSelectedComment={setSelectedComment}
          // handleToggleEditForm={() => {
          //   setIsEditingComment(comment._id);
          //   setFormOpen(true);
          //   setSelectedComment(
          //     props.comments.find((element) => element._id === comment._id)
          //   )
          // }}
          formOpen={formOpen}
          handleDeleteComment={async () => {
            await props.handleDeleteComment(
              props.volumeId,
              comment._id
            );
          }}
          handleUpdateComment={props.handleUpdateComment}
          // handleCancelEdit={handleCancelEdit}
          commentSavedUpdateRender={props.commentSavedUpdateRender}
          selectedComment={selectedComment}
          setFormOpen={setFormOpen}
        />
      ))}
      </div>
        {/* {isEditingComment && (
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
        )} */}
    </div>
  )
}

export default Comments;
