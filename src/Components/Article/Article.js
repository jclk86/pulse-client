import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleContext from "../../Context/ArticleContext";
import "./Article.css";

class Article extends Component {
  static contextType = ArticleContext;

  render() {
    const { article } = this.props;

    return (
      <div className="container_article">
        <div className="container_image">IMAGE SECTION</div>
        <h2>{article.title}</h2>
        <p>
          <span>By</span> {article.author.username}
        </p>
        <p>{article.content}</p>
      </div>
    );
  }
}

export default withRouter(Article);
