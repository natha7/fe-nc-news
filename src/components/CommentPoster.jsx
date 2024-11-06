import { useContext, useEffect, useState } from "react";
import { postCommentByArticleId } from "../api";
import { UserContext } from "../contexts/User";

export default function CommentPoster(props) {
  const { user } = useContext(UserContext);
  const [currText, setCurrText] = useState("");
  const [commentToPost, setCommentToPost] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const {
    article_id,
    setComments,
    setHasCommentFailedToPost,
    setIsCommentEmpty,
  } = props;

  function handleCommentSubmission(event) {
    event.preventDefault();
    if (!currText) {
      return setIsCommentEmpty(true);
    } else setIsCommentEmpty(false);
    setCommentToPost(() => {
      return currText;
    });
  }

  useEffect(() => {
    if (commentToPost && !isBtnDisabled) {
      setIsBtnDisabled(true);
      postCommentByArticleId(article_id, {
        body: commentToPost,
        username: user,
      })
        .then(({ data }) => {
          setComments((curComments) => {
            return [data.comment, ...curComments];
          });
          setIsBtnDisabled(false);
          setCurrText("");
          setCommentToPost("");
        })
        .catch(() => {
          setHasCommentFailedToPost(() => {
            return true;
          });
          setTimeout(() => {
            setCommentToPost("");
            setIsBtnDisabled(false);
            setHasCommentFailedToPost(() => {
              return false;
            });
          }, 3000);
        });
    }
  }, [commentToPost]);

  return (
    <form onSubmit={handleCommentSubmission}>
      <textarea
        wrap="hard"
        name="commentArea"
        className="comment-textbox"
        value={currText}
        onChange={(event) => setCurrText(event.target.value)}
        rows={10}
        cols={30}
      ></textarea>
      <button id="comment-submit-btn" type="submit" disabled={isBtnDisabled}>
        {isBtnDisabled ? "Posting..." : "Post comment"}
      </button>
    </form>
  );
}
