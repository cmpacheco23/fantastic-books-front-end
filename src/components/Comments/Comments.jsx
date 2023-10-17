import CommentCard from "../CommentCard/CommentCard";

const Comments = ({comments}) => {
  if (!comments) {
    return <h4>No Comments</h4>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
        />
      ))}
    </div>
  );
}

export default Comments;
