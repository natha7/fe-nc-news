import { dateConverter } from "../../utils/utils";
import CommentsList from "../comments/CommentsList";
import VotingBtns from "../utils/VotingBtns";

export default function SingleArticle(props) {
  const { article, articleVotes, setArticleVotes } = props;

  return (
    <section className="min-h-screen z-10 bg-white pt-3 md:mx-[10%] lg:mx-[20%]">
      <div className="flex flex-col m-2 mb-16">
        <div className="m-auto">
          <p className="text-3xl">{article.title}</p>
          <p className="bg-emerald-200 max-w-fit text-sm text-black px-2 rounded-sm font-medium">
            {article.topic}
          </p>
          <p>by {article.author}</p>
          <div className=" m-auto">
            <img
              className="m-auto w-full rounded-md"
              src={article.article_img_url}
            />
            <div className="flex justify-between items-center mt-1">
              <p>{`Posted ${dateConverter(article.created_at)}`}</p>

              <div className="flex justify-end">
                <p className="ml-2 self-center mr-4">
                  Article votes: {articleVotes}
                </p>
                <VotingBtns
                  setVotes={setArticleVotes}
                  itemToVoteId={article.article_id}
                  typeOfItem="article"
                  size="20"
                />
              </div>
            </div>
          </div>

          <p className="mt-5">{article.body}</p>
        </div>
      </div>
      <CommentsList article_id={article.article_id} votes={article.votes} />
    </section>
  );
}
