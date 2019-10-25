import config from "../config";

const NewsApiService = {
  getNews() {
    return fetch(`${config.NEWS_ENDPOINT}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default NewsApiService;
