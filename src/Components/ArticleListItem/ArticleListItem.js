import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { DateFormatter } from "../Utils/Utils";
import CommentApiService from "../../Services/comment-api-service";
import VoteApiService from "../../Services/vote-api-service";
import ArticleContext from "../../Context/ArticleContext";
import PropTypes from "prop-types";
import "./ArticleListItem.css";

// need to proptypes

class ArticleListItem extends Component {
  static contextType = ArticleContext;

  componentDidMount() {
    CommentApiService.getAllComments().then(this.context.setComments);
    VoteApiService.getVotesForArticle(this.props.article.id).then(
      this.context.setVotes
    );
  }

  getTotalComments(article_id, comments) {
    return comments.filter(comment => article_id === comment.article_id).length;
  }

  renderTotalVotes(article_id, votes) {
    return votes.filter(vote => article_id === vote.article_id);
  }

  ellipsify(string) {
    if (string.length > 140) {
      return string.substring(0, 120) + "...";
    } else {
      return string;
    }
  }

  render() {
    const { article } = this.props;
    const { comments, votes } = this.context;
    const numOfComments = this.getTotalComments(article.id, comments);
    const previewText = this.ellipsify(article.content);
    const numOfVotes = this.renderTotalVotes(article.id, votes);

    return (
      <div className="container_article_list_item">
        <div className="container_article_preview">
          <NavLink role="navigation" to={`/articles/${article.id}`}>
            {" "}
            <h4 className="article_title">{article.title}</h4>{" "}
          </NavLink>
          <p>Votes: </p>
          <p>{DateFormatter(article.date_created)} </p>
          <p>{previewText}</p>
          <p className="article_info">
            <span>{numOfComments} comments</span>
            <span>/{article.article_category}/</span>
            <span>by</span> {article.author.username}
          </p>
        </div>
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
