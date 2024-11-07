import { useState } from "react";
import { changeItemVotesById } from "../api";

export default function VotingBtns(props) {
  const [hasVoteFailed, setHasVoteFailed] = useState(false);
  const [isLikeBtnPressed, setIsLikeBtnPressed] = useState(false);
  const [isDislikeBtnPressed, setIsDislikeBtnPressed] = useState(false);
  const { setVotes, itemToVoteId, typeOfItem } = props;

  function sendUpdateRequest(requestBody) {
    return changeItemVotesById(itemToVoteId, requestBody, typeOfItem);
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
      setVotes((curVotes) => {
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
        setVotes((currVotes) => {
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
        setVotes((currVotes) => {
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
        setVotes((currVotes) => {
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
        setVotes((currVotes) => {
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
        setVotes((currVotes) => {
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
        setVotes((currVotes) => {
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
  return (
    <>
      {hasVoteFailed ? <p>Something went wrong, please try again</p> : null}
      <button className="like-btn" onClick={changeLikes} value="like">
        {isLikeBtnPressed ? "Undo Like" : "Like"}
      </button>
      <button className="dislike-btn" onClick={changeLikes} value="dislike">
        {isDislikeBtnPressed ? "Undo Dislike" : "Dislike"}
      </button>
    </>
  );
}
