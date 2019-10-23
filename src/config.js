export default {
  API_ENDPOINT: "http://localhost:8000/api", //"https://arcane-refuge-94724.herokuapp.com/api",
  TOKEN_KEY: process.env.REACT_APP_API_KEY,
  GEOLOCATION_ENDPOINT: `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_GEOLOCATOR_API_KEY}`
};
//  https://arcane-refuge-94724.herokuapp.com/api", change in env
