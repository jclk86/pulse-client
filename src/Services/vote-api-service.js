import config from "../config";
import TokenService from "./token-service";

const VoteApiService = {
  getVotesForArticles(article_id) {
    return fetch(`${config.API_ENDPOINT}/votes/${article_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  addVoteForArticle(article_id) {
    return fetch(`${config.API_ENDPOINT}/votes/${article_id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  deleteVote(article_id) {
    return fetch(`${config.API_ENDPOINT}/votes/${article_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  }
};

export default VoteApiService;
