import { useContext, useEffect, useState } from "react";
import { postCommentByArticleId } from "../../api";
import { UserContext } from "../../contexts/UserProvider";
import ProfilePic from "../utils/ProfilePic";

export default function CommentPoster({
  article_id,
  setComments,
  setHasCommentFailedToPost,
  setIsCommentEmpty,
}) {
  const { user } = useContext(UserContext);
  const [currText, setCurrText] = useState("");
  const [commentToPost, setCommentToPost] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [charCount, setCharCount] = useState(0);

  function handleCommentSubmission(event) {
    event.preventDefault();
    if (!currText) {
      return setIsCommentEmpty(true);
    } else setIsCommentEmpty(false);
    setCommentToPost(() => {
      return currText;
    });
  }

  function handleTextAreaChange(event) {
    event.preventDefault();

    setCurrText(() => {
      return event.target.value;
    });

    setCharCount(() => {
      return currText.length;
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
    <form
      onSubmit={handleCommentSubmission}
      className="flex flex-col my-4 md:max-w-[50%]"
    >
      <label htmlFor="comment-area" className="flex">
        <ProfilePic size={"sm"} username={user} />
        {user ? (
          <p className="ml-2">{`Comment as ${user}`}</p>
        ) : (
          `Sign in to comment`
        )}
      </label>
      <p>{charCount}</p>

      <textarea
        wrap="hard"
        name="comment-area"
        id="comment-area"
        className="resize-none border-[1px] border-black/50 p-1 rounded-sm"
        value={currText}
        onChange={handleTextAreaChange}
        rows={5}
        cols={20}
      ></textarea>
      <button
        id="comment-submit-btn"
        type="submit"
        disabled={isBtnDisabled}
        className="self-end bg-emerald-800 px-3 text-white font-semibold mt-2 rounded-sm shadow-sm"
      >
        {isBtnDisabled ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
