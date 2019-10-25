import config from "../config";

const NewsApiService = {
  getNews() {
    return fetch(`${config.NEWS_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Credentials": "true"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default NewsApiService;
