import config from "../config";
import TokenService from "./token-service";

const CommentService = {
  getCommentById(comment_id) {
    return fetch(`${config.API_ENDPOINT}/comments/${comment_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
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
  updateComment(updatedComment, comment_id) {
    return fetch(`${config.API_ENDPOINT}/comments/${comment_id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedComment),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? Promise.reject(res) : res));
  }
};

export default CommentService;
