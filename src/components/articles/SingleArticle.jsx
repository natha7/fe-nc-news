import { dateConverter } from "../../utils/utils";
import CommentsList from "../comments/CommentsList";
import VotingBtns from "../utils/VotingBtns";

export default function SingleArticle(props) {
  const { article, articleVotes, setArticleVotes } = props;

  return (
    <section className="min-h-screen mx-3 z-10 bg-white pt-3">
      <div className="flex flex-col m-2 mb-16">
        <div className="mb-2">
          <p className="text-3xl">{article.title}</p>
          <div>
            <p className="bg-emerald-200 max-w-fit text-sm text-black px-2 rounded-sm font-medium">
              {article.topic}
            </p>
            <p>by {article.author}</p>
          </div>
        </div>
        <div className="my-2">
          <img className="single-article-img" src={article.article_img_url} />
          <div className="flex justify-between">
            <p>{`Posted ${dateConverter(article.created_at)}`}</p>
            <p className="ml-2">Article votes: {articleVotes}</p>
          </div>
          <div className="flex justify-end">
            <VotingBtns
              setVotes={setArticleVotes}
              itemToVoteId={article.article_id}
              typeOfItem="article"
              size="30"
            />
          </div>
        </div>
        <p className="single-article-body">{article.body}</p>
      </div>
      <CommentsList article_id={article.article_id} votes={article.votes} />
    </section>
  );
}
