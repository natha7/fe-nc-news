import { dateConverter } from "../utils/utils";

export default function CommentCard(props) {
  const { comment } = props;

  return (
    <article className="comment-card">
      <p className="comment-author">{comment.author}</p>
      <p className="comment-body">{comment.body}</p>
      <p>Comment votes: {comment.votes}</p>
      <p>{dateConverter(comment.created_at, "shortenedDifference")}</p>
      <button className="comment-like-btn">Like comment</button>
      <button className="comment-dislike-btn">Dislike comment</button>
    </article>
  );
}
