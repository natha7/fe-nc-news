import { useState } from "react";
import { changeItemVotesById } from "../../api";

export default function VotingBtns(props) {
  const [hasVoteFailed, setHasVoteFailed] = useState(false);
  const [isLikeBtnPressed, setIsLikeBtnPressed] = useState(false);
  const [isDislikeBtnPressed, setIsDislikeBtnPressed] = useState(false);
  const { setVotes, itemToVoteId, typeOfItem, size } = props;

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
    <div className="flex flex-row">
      {hasVoteFailed ? <p>Something went wrong, please try again</p> : null}

      <button
        className="mr-1 w-10 flex flex-col items-center"
        onClick={changeLikes}
        value="like"
      >
        {isLikeBtnPressed ? (
          <svg
            className="pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height={size}
            width={size}
          >
            <path
              className="pointer-events-none"
              fill="#0b7555"
              d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z"
            />
          </svg>
        ) : (
          <svg
            className="pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height={size}
            width={size}
          >
            <path
              className="pointer-events-none"
              fill="#0b7555"
              d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z"
            />
          </svg>
        )}
        <p className="pointer-events-none text-sm text-emerald-800">Like</p>
      </button>

      <button
        className="ml-1 w-10 flex flex-col items-center"
        onClick={changeLikes}
        value="dislike"
      >
        {isDislikeBtnPressed ? (
          <svg
            className="pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            width={size}
            viewBox="0 0 512 512"
          >
            <path
              className="pointer-events-none"
              fill="#0b7555"
              d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z"
            />
          </svg>
        ) : (
          <svg
            className="pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height={size}
            width={size}
          >
            <path
              className="pointer-events-none"
              fill="#0b7555"
              d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16l-97.5 0c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8L384 32c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32L0 128c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0z"
            />
          </svg>
        )}
        <p className="pointer-events-none text-sm text-emerald-800">Dislike</p>
      </button>
    </div>
  );
}
