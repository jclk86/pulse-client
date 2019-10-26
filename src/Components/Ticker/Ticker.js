import React, { Component } from "react";
import NewsApiService from "../../Services/news-api-service";
import "./Ticker.css";

class Ticker extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    NewsApiService.getNews().then(news =>
      this.setState({ news: news.articles })
    );
  }

  renderNewsTitles(articles) {
    return articles.map((article, i) => (
      <div className="ticker-item" key={i}>
        <a href={article.url} className="ticker_links">
          {article.title}
        </a>
      </div>
    ));
  }

  render() {
    const { news } = this.state;
    return (
      <div className="tcontainer">
        <div className="ticker-wrap">
          <div className="ticker-move">{this.renderNewsTitles(news)}</div>
        </div>
      </div>
    );
  }
}

export default Ticker;
