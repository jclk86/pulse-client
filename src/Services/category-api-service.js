import config from "../config";

const CategoryApiService = {
  getAllCategories() {
    return fetch(`${config.API_ENDPOINT}/categories`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default CategoryApiService;
