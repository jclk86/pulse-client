import React, { Component } from "react";
import NewsApiService from "../../Services/news-api-service";
import "./Ticker.css";

class Ticker extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    NewsApiService.getNews().then(news => this.setState({ news }));
  }

  render() {
    console.log(this.state.news);
    return (
      <div className="tcontainer">
        <div className="ticker-wrap">
          <div className="ticker-move">
            <div className="ticker-item">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className="ticker-item">
              Aliquam consequat varius consequat.
            </div>
            <div className="ticker-item">
              Fusce dapibus turpis vel nisi malesuada sollicitudin.
            </div>
            <div className="ticker-item">
              Pellentesque auctor molestie orci ut blandit.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ticker;
