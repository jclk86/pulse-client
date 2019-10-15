import config from "../config";

const TagApiService = {
  getAllTags() {
    return fetch(`${config.API_ENDPOINT}/tags`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default TagApiService;
