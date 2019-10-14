import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { DateFormatter } from "../Utils/Utils";
import PropTypes from "prop-types";

// need to proptypes

class ArticleListItem extends Component {
  render() {
    const { article } = this.props;
    console.log(article);
    return (
      // change the template string
      <NavLink role="navigation" to={`/articles/${article.id}`}>
        <div className="container_article_item">
          <h2 className="article_title">{article.title}</h2>
          <p>{DateFormatter(article.date_created)}</p>
          <p>
            <span>by</span> {article.author.username}
          </p>
        </div>
      </NavLink>
    );
  }
}

ArticleListItem.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    date_created: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string
    })
  })
};

export default withRouter(ArticleListItem);
