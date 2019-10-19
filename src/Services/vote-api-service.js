import config from "../config";
import TokenService from "./token-service";

const VoteApiService = {
  getVotesForArticle(article_id) {
    return fetch(`${config.API_ENDPOINT}/votes/${article_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default VoteApiService;
