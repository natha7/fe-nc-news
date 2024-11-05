import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://natha7-nc-news.onrender.com/api",
  timeout: 10000,
});

export function getArticles(currPage) {
  return apiClient.get(`/articles?limit=10&p=${currPage}`).then(({ data }) => {
    return data.articles;
  });
}

export function getPageNumbers(limit = 10) {
  return apiClient.get(`/articles?limit=1000`).then(({ data }) => {
    let maxArticles = data.articles.length;
    const pageNumbers = [];
    for (let i = 0; maxArticles > 0; i++) {
      maxArticles -= limit;
      pageNumbers.push(i + 1);
    }
    return pageNumbers;
  });
}

export function getArticleById(id) {
  return apiClient.get(`/articles/${id}`).then(({ data }) => {
    return data.article;
  });
}

export function getCommentsByArticleId(id) {
  return apiClient.get(`articles/${id}/comments`).then(({ data }) => {
    return data.comments;
  });
}
