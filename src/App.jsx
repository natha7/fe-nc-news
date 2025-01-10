import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import ArticlesContainer from "./components/articles/ArticlesContainer.jsx";
import SingleArticlePage from "./components/articles/SingleArticlePage.jsx";
import { ScrollToTop } from "./utils/utils";
import ErrorMsg from "./components/errors/ErrorMsg.jsx";

export default function App() {
  return (
    <div className="bg-zinc-200 z-0">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticlesContainer />} />
        <Route path="/article/:article_id" element={<SingleArticlePage />} />
        <Route path="/articles/:topic_name" element={<ArticlesContainer />} />
        <Route path="*" element={<ErrorMsg isPageNotFound={true} />} />
      </Routes>
      <ScrollToTop />
    </div>
  );
}
