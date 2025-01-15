import { useEffect } from "react";
import { getPageNumbers } from "../../api";
import { ScrollToTop } from "../../utils/utils";

export default function PageNumbers(props) {
  const { setPageNum, topicName, pages, setPages } = props;

  function choosePageNum(event) {
    setPageNum(() => {
      return event.target.value;
    });
    scrollTo({ left: 0, top: 0 });
  }

  useEffect(() => {
    getPageNumbers(undefined, topicName).then((pageBtnValues) => {
      setPages(() => {
        return pageBtnValues;
      });
    });
  }, [topicName]);

  return (
    <div className="flex flex-row justify-center">
      {pages.map((page) => {
        return (
          <button
            className="px-2 mx-1 active:underline hover:text-emerald-800"
            key={"page" + page}
            onClick={choosePageNum}
            value={page}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
