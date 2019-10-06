import config from "../config"
import TokenService from "./token-service"

const ArticleApiService = {
  getAllArticles() {
    return fetch(`${config.API_ENDPOINT}/articles`, {
      method: "GET",
      headers: {
        "content-type": "application/json", // bearer or Bearer? 
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => !res.ok ? res.json().then(e => Promise.reject(e)) : res.json())
  }
}

export default ArticleApiService;