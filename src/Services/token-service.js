import config from "../config";
import jwtDecode from "jwt-decode";

let _timeoutId;
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  },
  parseJwt(jwt) {
    if (jwt) {
      return jwtDecode(jwt);
    } else {
      return {};
    }
  },
  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken());
  },
  // Starting time of idle timeout established.
  _getMsUntilExpiry(payload) {
    return payload.exp * 1000 - Date.now();
  },
  // Queues callback 10 seconds before timeout.
  queueCallbackBeforeExpiry(callback) {
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.readJwtToken()
    );

    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
  },
  // Clears the setTimeout.
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId);
  }
};

export default TokenService;
