export default {
  // API_ENDPOINT: "http://localhost:8000/api",
  API_ENDPOINT: "https://arcane-refuge-94724.herokuapp.com/api",
  TOKEN_KEY: process.env.REACT_APP_API_KEY,
  NEWS_ENDPOINT: `https://gnews.io/api/v3/search?q=travel&token=${process.env.REACT_APP_GNEWS_API_KEY}`,
  // NEWS_ENDPOINT: `https://newsapi.org/v2/everything?q=traveling&sortBy=publishedAt&from=${formatDate(currentDate)}&to=${formatDate(currentDate, 3)}&pageSize=15&apiKey=afc5d75ddfff4597be88b995978ccdab`
};
