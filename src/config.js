let currentDate = Date.now();

function formatDate(date, offset=0) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate() - offset,
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}


export default {
  // API_ENDPOINT: "http://localhost:8000/api",
  API_ENDPOINT: "https://arcane-refuge-94724.herokuapp.com/api",
  TOKEN_KEY: process.env.REACT_APP_API_KEY,
  NEWS_ENDPOINT: `https://newsapi.org/v2/everything?q=traveling&sortBy=publishedAt&from=${formatDate(currentDate)}&to=${formatDate(currentDate, 3)}&pageSize=15&apiKey=afc5d75ddfff4597be88b995978ccdab`
};
