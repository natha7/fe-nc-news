import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://natha7-nc-news.onrender.com/api",
  timeout: 3000,
});

export function getArticles(
  currPage,
  topicName,
  filters = ["created_at", "desc"],
  limit = 5
) {
  const [sortBy, order] = filters;

  let requestUrl = `articles?p=${currPage}&sort_by=${sortBy}&order=${order}&limit=${limit}`;
  if (topicName) {
    requestUrl += `&topic=${topicName}`;
  }
  return apiClient.get(requestUrl).then(({ data }) => {
    return data.articles;
  });
}

export function getPageNumbers(limit = 5, topicName) {
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

export function getTopArticles(limit, topic) {
  return apiClient
    .get(
      `/articles?p=0&sort_by=votes&order=desc&limit=${limit}${
        topic ? `&topic=${topic}` : null
      }`
    )
    .then(({ data }) => {
      return data.articles;
    });
}
