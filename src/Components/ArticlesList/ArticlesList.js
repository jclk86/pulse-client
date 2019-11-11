import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import PropTypes from "prop-types";

class ArticlesList extends Component {
  render() {
    const { sortedArticles } = this.props;

    return (
      <div className="container_article_list" role="navigation">
        {sortedArticles.map(article => (
          <ArticleListItem article={article} key={article.id}></ArticleListItem>
        ))}
      </div>
    );
  }
}

ArticlesList.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    article_category: PropTypes.string,
    image_url: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    date_created: PropTypes.string,
    num_of_votes: PropTypes.number,
    author: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      fullname: PropTypes.string
    })
  })
};

export default withRouter(ArticlesList);
