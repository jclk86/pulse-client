export default {
  API_ENDPOINT: "http://localhost:8000/api",
  // API_ENDPOINT: "https://arcane-refuge-94724.herokuapp.com/api",
  TOKEN_KEY: process.env.REACT_APP_API_KEY,
  GEOLOCATION_ENDPOINT: `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_GEOLOCATOR_API_KEY}`,
  NEWS_ENDPOINT: `https://newsapi.org/v2/everything?q=travel&sortBy=publishedAt&pageSize=15&apiKey=afc5d75ddfff4597be88b995978ccdab`
};
