import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ArticlesContainer from "./components/ArticlesContainer";
import SingleArticlePage from "./components/SingleArticlePage";
import { ScrollToTop } from "./utils/utils";
import ErrorMsg from "./components/ErrorMsg";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticlesContainer />} />
        <Route path="/article/:article_id" element={<SingleArticlePage />} />
        <Route
          path="/articles/:topic_name"
          element={<ArticlesContainer isTopic={true} />}
        />
        <Route path="*" element={<ErrorMsg isPageNotFound={true} />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}
