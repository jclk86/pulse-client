import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { DateFormatter } from "../Utils/Utils";
import CommentApiService from "../../Services/comment-api-service";
import ArticleContext from "../../Context/ArticleContext";
import PropTypes from "prop-types";
import "./ArticleListItem.css";

// need to proptypes

class ArticleListItem extends Component {
  static contextType = ArticleContext;
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    CommentApiService.getAllComments().then(comments => {
      this.setState({ comments: comments });
    });
  }

  getTotalComments(article_id, comments) {
    return comments.filter(comment => article_id === comment.article_id).length;
  }

  render() {
    const { article } = this.props;
    const { comments } = this.state;
    const numOfComments = this.getTotalComments(article.id, comments);

    return (
      <div className="container_article_list_item">
        <NavLink role="navigation" to={`/articles/${article.id}`}>
          <div className="container_article_item_image">
            <img
              src={article.image_url}
              alt="user-submitted"
              className="article_list_item_image"
            ></img>
          </div>
          <h2 className="article_title">{article.title}</h2>
          <p>{DateFormatter(article.date_created)} </p>
          <p>
            <span>{numOfComments} comments</span>
            <span>/{article.article_tag}/</span>
            <span>by</span> {article.author.username}
          </p>
        </NavLink>
      </div>
    );
  }
}

ArticleListItem.propTypes = {
  article: PropTypes.shape({
    image_url: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    date_created: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string
    })
  })
};

export default withRouter(ArticleListItem);
