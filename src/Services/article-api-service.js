import config from "../config";
import TokenService from "./token-service";

const ArticleApiService = {
  getAllArticles() {
    return fetch(`${config.API_ENDPOINT}/articles`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getArticleById(article_id) {
    return fetch(`${config.API_ENDPOINT}/articles/${article_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getCommentsForArticle(article_id) {
    return fetch(`${config.API_ENDPOINT}/articles/${article_id}/comments`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postArticle(newArticle) {
    return fetch(`${config.API_ENDPOINT}/articles`, {
      method: "POST",
      body: JSON.stringify(newArticle),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  updateArticle(updatedArticle, article_id) {
    return fetch(`${config.API_ENDPOINT}/articles/${article_id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedArticle),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? Promise.reject(res) : res));
  },
  deleteArticle(article_id) {
    return fetch(`${config.API_ENDPOINT}/articles/${article_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      if (!res.ok) {
        return res.json().then(error => Promise.reject(error));
      }
    });
  }
};

export default ArticleApiService;
