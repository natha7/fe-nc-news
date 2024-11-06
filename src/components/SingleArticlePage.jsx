import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { changeArticleVotesById, getArticleById } from "../api";
import { dateConverter } from "../utils/utils";
import CommentsList from "./CommentsList";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const [articleVotes, setArticleVotes] = useState(0);
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoteFailed, setHasVoteFailed] = useState(false);
  const [isLikeBtnPressed, setIsLikeBtnPressed] = useState(false);
  const [isDislikeBtnPressed, setIsDislikeBtnPressed] = useState(false);

  function sendUpdateRequest(requestBody) {
    return changeArticleVotesById(article_id, requestBody);
  }

  function toggleTimedVoteFailError(
    voteReversalNum,
    toggleReversal,
    typeOfBtn,
    button
  ) {
    setHasVoteFailed(() => {
      return true;
    });
    button.disabled = true;
    setTimeout(() => {
      setArticleVotes((curVotes) => {
        return curVotes + voteReversalNum;
      });
      typeOfBtn === "like"
        ? setIsLikeBtnPressed(() => {
            return toggleReversal;
          })
        : setIsDislikeBtnPressed(() => {
            return toggleReversal;
          });
      setHasVoteFailed(false);
      button.disabled = false;
    }, 2000);
  }

  function changeLikes(event) {
    const isLike = event.target.value === "like";
    const button = event.target;
    const incByOne = { inc_votes: 1 };
    const decByOne = { inc_votes: -1 };

    if (isLike) {
      if (!isLikeBtnPressed && !isDislikeBtnPressed) {
        setArticleVotes((currVotes) => {
          return currVotes + 1;
        });
        setIsLikeBtnPressed(() => {
          return true;
        });
        sendUpdateRequest(incByOne).catch(() => {
          toggleTimedVoteFailError(-1, false, "like", button);
        });
      }
      if (isLikeBtnPressed && !isDislikeBtnPressed) {
        setArticleVotes((currVotes) => {
          return currVotes - 1;
        });
        setIsLikeBtnPressed(() => {
          return false;
        });
        sendUpdateRequest(decByOne).catch(() => {
          toggleTimedVoteFailError(1, true, "like", button);
        });
      }
      if (!isLikeBtnPressed && isDislikeBtnPressed) {
        setArticleVotes((currVotes) => {
          return currVotes + 1;
        });
        setIsDislikeBtnPressed(() => {
          return false;
        });
        sendUpdateRequest(incByOne).catch(() => {
          toggleTimedVoteFailError(-1, true, "like", button);
        });
      }
    }
    if (!isLike) {
      if (!isLikeBtnPressed && !isDislikeBtnPressed) {
        setArticleVotes((currVotes) => {
          return currVotes - 1;
        });
        setIsDislikeBtnPressed(() => {
          return true;
        });
        sendUpdateRequest(decByOne).catch(() => {
          toggleTimedVoteFailError(1, false, "dislike", button);
        });
      }
      if (!isLikeBtnPressed && isDislikeBtnPressed) {
        setArticleVotes((currVotes) => {
          return currVotes + 1;
        });
        setIsDislikeBtnPressed(() => {
          return false;
        });
        sendUpdateRequest(incByOne).catch(() => {
          toggleTimedVoteFailError(-1, true, "dislike", button);
        });
      }
      if (isLikeBtnPressed && !isDislikeBtnPressed) {
        setArticleVotes((currVotes) => {
          return currVotes - 1;
        });
        setIsLikeBtnPressed(() => {
          return false;
        });
        sendUpdateRequest(decByOne).catch(() => {
          toggleTimedVoteFailError(1, true, "dislike", button);
        });
      }
    }
  }

  useEffect(() => {
    setIsLoading(() => {
      return true;
    });
    getArticleById(article_id).then((fetchedArticle) => {
      setArticle(() => {
        setIsLoading(() => {
          return false;
        });
        return fetchedArticle;
      });
    });
  }, []);

  useEffect(() => {
    setArticleVotes(() => {
      return article.votes;
    });
  }, [article]);

  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <section>
          <h1>{article.title}</h1>
          <p>{article.topic}</p>
          <img className="single-article-img" src={article.article_img_url} />
          <p>by {article.author}</p>
          <p>{`Posted ${dateConverter(article.created_at)}`}</p>
          <p className="single-article-body">{article.body}</p>
          <p>Article votes: {articleVotes}</p>
          {hasVoteFailed ? (
            <p>Something went wrong voting, please try again</p>
          ) : null}
          <button
            className="article-like-btn"
            onClick={changeLikes}
            value="like"
          >
            {isLikeBtnPressed ? "Undo Like" : "Like"}
          </button>
          <button
            className="article-dislike-btn"
            onClick={changeLikes}
            value="dislike"
          >
            {isDislikeBtnPressed ? "Undo Dislike" : "Dislike"}
          </button>
          <CommentsList article_id={article_id} votes={article.votes} />
        </section>
      )}
    </div>
  );
}
