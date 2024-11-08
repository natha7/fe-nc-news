import { useEffect, useState } from "react";
import { getPageNumbers } from "../api";

export default function PageNumbers(props) {
  const [pages, setPages] = useState([]);
  const { setPageNum, topicName } = props;

  function choosePageNum(event) {
    setPageNum(() => {
      return event.target.value;
    });
  }

  useEffect(() => {
    getPageNumbers(undefined, topicName).then((pageBtnValues) => {
      setPages(() => {
        return pageBtnValues;
      });
    });
  }, [topicName]);

  return (
    <div>
      {pages.map((page) => {
        return (
          <button key={"page" + page} onClick={choosePageNum} value={page}>
            {page}
          </button>
        );
      })}
    </div>
  );
}
