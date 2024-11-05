import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ArticlesContainer from "./components/ArticlesContainer";
import SingleArticlePage from "./components/SingleArticlePage";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticlesContainer />} />
        <Route path="/articles/:article_id" element={<SingleArticlePage />} />
      </Routes>
    </>
  );
}
