import { dateConverter } from "../../utils/utils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User";
import { deleteCommentByCommentId } from "../../api";
import VotingBtns from "../utils/VotingBtns";
import ProfilePic from "../utils/ProfilePic";

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
  }, [comment.votes]);

  return (
    <article className="border-[1px] p-2 my-1 shadow-sm">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ProfilePic size="comment" username={comment.author} />
            <p className="ml-2 comment-author font-semibold">
              {comment.author}
            </p>
          </div>
          <p className="text-gray-600">
            Posted {dateConverter(comment.created_at, "shortenedDifference")}
          </p>
        </div>
        <section>
          {comment.body.split("\n").map((commentSegment, index) => {
            return (
              <p
                className="break-words"
                key={comment.comment_id + `segment${index}`}
              >
                {commentSegment}
              </p>
            );
          })}
        </section>

        <div className="self-end">
          <p
            className="text-right text-s text-gray-600
          "
          >
            {commentVotes}{" "}
            {commentVotes === 1 || commentVotes === -1 ? "vote" : "votes"}
          </p>
          {user === comment.author ? (
            <button
              className="bg-emerald-800 px-3 text-white mt-2 rounded-sm w-fit"
              onClick={handleDeleteComment}
            >
              {isLoading ? "Deleting..." : "Delete comment"}
            </button>
          ) : null}
          {user === comment.author ? null : (
            <VotingBtns
              setVotes={setCommentVotes}
              itemToVoteId={comment.comment_id}
              typeOfItem="comment"
              size="20"
            />
          )}
        </div>
      </div>
    </article>
  );
}
