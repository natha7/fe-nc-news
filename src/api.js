import axios from "axios";
let apiUrl = "https://natha7-nc-news.onrender.com/api";

export function getArticles(currPage) {
  return axios
    .get(`${apiUrl}/articles?limit=10&p=${currPage}`)
    .then(({ data }) => {
      return data.articles;
    });
}

export function getPageNumbers(limit = 10) {
  return axios.get(`${apiUrl}/articles?limit=1000`).then(({ data }) => {
    let maxArticles = data.articles.length;
    const pageNumbers = [];
    for (let i = 0; maxArticles > 0; i++) {
      maxArticles -= limit;
      pageNumbers.push(i + 1);
    }
    return pageNumbers;
  });
}
