import config from "../config";
import TokenService from "./token-service";

const CommentService = {
  postComment(newComment) {
    return fetch(`${config.API_ENDPOINT}/comments`, {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
}

export default CommentService;