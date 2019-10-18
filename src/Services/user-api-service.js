import config from "../config";
import TokenService from "../Services/token-service";

const UserApiService = {
  getUserAccount() {
    return fetch(`${config.API_ENDPOINT}/user/account`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  updateUserAccount(updatedUser) {
    return fetch(`${config.API_ENDPOINT}/user/account`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? Promise.reject(res) : res));
  },
  getUserProfile(username) {
    return fetch(`${config.API_ENDPOINT}/user/profile/${username}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default UserApiService;
