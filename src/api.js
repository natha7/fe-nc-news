import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://natha7-nc-news.onrender.com/api",
  timeout: 10000,
});

export function getArticles(currPage, topicName, searchParams) {
  let sortBy = searchParams.get("sort");
  let order = searchParams.get("order");

  if (!sortBy) sortBy = "created_at";
  if (!order) order = "desc";

  let requestUrl = `articles?p=${currPage}&sort_by=${sortBy}&order=${order}`;
  if (topicName) {
    requestUrl += `&topic=${topicName}`;
  }
  return apiClient.get(requestUrl).then(({ data }) => {
    return data.articles;
  });
}

export function getPageNumbers(limit = 10, topicName) {
  let requestUrl = `/articles?limit=1000`;
  if (topicName) {
    requestUrl += `&topic=${topicName}`;
  }
  return apiClient.get(requestUrl).then(({ data }) => {
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

export function changeItemVotesById(id, requestBody, typeOfItemToChange) {
  if (typeOfItemToChange === "article") {
    return apiClient.patch(`articles/${id}`, requestBody);
  } else {
    return apiClient.patch(`comments/${id}`, requestBody);
  }
}

export function postCommentByArticleId(id, requestBody) {
  return apiClient.post(`articles/${id}/comments`, requestBody);
}

export function getUserByUsername(username) {
  return apiClient.get(`users/${username}`);
}

export function deleteCommentByCommentId(id) {
  return apiClient.delete(`comments/${id}`);
}

export function getTopics() {
  return apiClient.get(`/topics`).then(({ data }) => {
    return data.topics;
  });
}

export function getTopArticles() {
  return apiClient
    .get("/articles?p=0&sort_by=votes&order=desc&limit=5")
    .then(({ data }) => {
      return data.articles;
    });
}
