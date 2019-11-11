import React, { Component } from "react";
import NewsApiService from "../../Services/news-api-service";
import ArticleListContext from "../../Context/ArticleListContext";
import "./Ticker.css";

class Ticker extends Component {
  static contextType = ArticleListContext;
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
        <a
          role="navigation"
          href={article.url}
          className={`ticker_links + ${
            this.context.lightsOff ? "" : "ticker_links_lights_off"
          }`}
        >
          {article.title}
        </a>
      </div>
    ));
  }

  render() {
    const { news } = this.state;
    const { lightsOff } = this.context;
    return (
      <div className="tcontainer" role="complementary">
        <h4 className="ticker_title">Trending News</h4>
        <div
          className={`ticker-wrap + ${
            lightsOff ? "" : "ticker-wrap-lights-off"
          }`}
        >
          <div className="ticker-move" role="navigation">
            {this.renderNewsTitles(news)}
          </div>
        </div>
      </div>
    );
  }
}

export default Ticker;
