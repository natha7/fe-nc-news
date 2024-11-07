import { dateConverter } from "../utils/utils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteCommentByCommentId } from "../api";
import VotingBtns from "./VotingBtns";

export default function CommentCard(props) {
  const { comment, setComments } = props;
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [commentVotes, setCommentVotes] = useState(0);

  function handleDeleteComment(event) {
    event.target.disabled = true;
    setIsLoading(() => {
      return true;
    });
    deleteCommentByCommentId(comment.comment_id).then(() => {
      setComments((currentComments) => {
        const deletedCommentRemoved = currentComments.filter((currComment) => {
          return currComment.comment_id !== comment.comment_id;
        });
        return deletedCommentRemoved;
      });
      setIsLoading(() => {
        return false;
      });
    });
  }

  useEffect(() => {
    setCommentVotes(() => {
      return comment.votes;
    });
  }, []);

  return (
    <article className="comment-card">
      <p className="comment-author">{comment.author}</p>
      <section className="comment-body">
        {comment.body.split("\n").map((commentSegment, index) => {
          return (
            <p key={comment.comment_id + `segment${index}`}>{commentSegment}</p>
          );
        })}
      </section>
      <p>Comment votes: {commentVotes}</p>
      <p>Posted: {dateConverter(comment.created_at, "shortenedDifference")}</p>
      {user === comment.author ? (
        <button className="delete-comment-btn" onClick={handleDeleteComment}>
          {isLoading ? "Deleting..." : "Delete comment"}
        </button>
      ) : null}
      {user === comment.author ? null : (
        <VotingBtns
          setVotes={setCommentVotes}
          itemToVoteId={comment.comment_id}
          typeOfItem="comment"
        />
      )}
    </article>
  );
}
