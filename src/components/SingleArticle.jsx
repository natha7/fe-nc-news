import { dateConverter } from "../utils/utils";
import CommentsList from "./CommentsList";
import VotingBtns from "./VotingBtns";

export default function SingleArticle(props) {
  const { article, articleVotes, setArticleVotes } = props;

  return (
    <div>
      <section>
        <h1>{article.title}</h1>
        <p>{article.topic}</p>
        <img className="single-article-img" src={article.article_img_url} />
        <p>by {article.author}</p>
        <p>{`Posted ${dateConverter(article.created_at)}`}</p>
        <p className="single-article-body">{article.body}</p>
        <p>Article votes: {articleVotes}</p>
        <VotingBtns
          setVotes={setArticleVotes}
          itemToVoteId={article.article_id}
          typeOfItem="article"
        />
        <CommentsList article_id={article.article_id} votes={article.votes} />
      </section>
    </div>
  );
}
