import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleListItem from "../ArticleListItem/ArticleListItem";

class ArticlesList extends Component {
  render() {
    const { sortedArticles } = this.props;

    return (
      <div className="container_article_list">
        {sortedArticles.map(article => (
          <ArticleListItem article={article} key={article.id}></ArticleListItem>
        ))}
      </div>
    );
  }
}

export default withRouter(ArticlesList);
