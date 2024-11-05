import { dateConverter } from "../utils/utils";

export default function CommentCard(props) {
  const { comment } = props;

  return (
    <article className="comment-card">
      <p className="comment-author">{comment.author}</p>
      <p className="comment-body">{comment.body}</p>
      <p>Comment votes: {comment.votes}</p>
      <p>Posted: {dateConverter(comment.created_at, "shortenedDifference")}</p>
    </article>
  );
}
