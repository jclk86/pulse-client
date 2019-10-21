import config from "../config";
import TokenService from "./token-service";

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const GeolocationApiService = {
  getUserLocation() {
    return fetch(proxyurl + `${config.GEOLOCATION_ENDPOINT}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  updateUserLocation(location) {
    return fetch(`${config.API_ENDPOINT}/user/location`, {
      method: "PATCH",
      body: JSON.stringify(location),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? Promise.reject(res) : res));
  }
};

export default GeolocationApiService;
