import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { DateFormatter } from "../Utils/Utils";
import CommentApiService from "../../Services/comment-api-service";
import VoteApiService from "../../Services/vote-api-service";
import ArticleListContext from "../../Context/ArticleListContext";
import PropTypes from "prop-types";
import "./ArticleListItem.css";

// need to proptypes

class ArticleListItem extends Component {
  static contextType = ArticleListContext;

  componentDidMount() {
    CommentApiService.getAllComments().then(this.context.setComments);
  }

  getTotalComments(article_id, comments) {
    return comments.filter(comment => article_id === comment.article_id).length;
  }

  filterTotalVotes(article_id, votes) {
    return votes.filter(vote => article_id === vote.article_id);
  }

  ellipsify(string) {
    if (string.length > 140) {
      return string.substring(0, 120) + "...";
    } else {
      return string;
    }
  }

  handleClickUpArrow(article_id) {
    VoteApiService.addVoteForArticle(article_id).then(this.context.addVote);
  }

  render() {
    const { article, votes } = this.props;
    const { comments } = this.context;
    const numOfComments = this.getTotalComments(article.id, comments);
    const previewText = this.ellipsify(article.content);
    const totalVotes = this.filterTotalVotes(article.id, votes);
    // const numOfVotes = totalVotes.length ? totalVotes.length : 0;
    console.log(totalVotes);
    return (
      <div className="container_article_list_item">
        <div className="container_article_preview">
          <div className="container_vote_arrows">
            <div className="container_arrow_up">
              <div
                className="arrow_up"
                onClick={() => this.handleClickUpArrow(article.id)}
              ></div>
            </div>
            <div className="container_vote_count">
              <p className="vote_count">{}</p>
            </div>
            <div className="container_arrow_down">
              <div className="arrow_down"></div>
            </div>
          </div>
          <div className="container_article_text_preview">
            <NavLink
              role="navigation"
              to={`/articles/${article.id}`}
              className="article_list_item_title_link"
            >
              {" "}
              <h4 className="article_list_item_title">{article.title}</h4>{" "}
            </NavLink>
            <p>{DateFormatter(article.date_created)} </p>
            <p>{previewText}</p>
            <p className="article_info">
              <span>{numOfComments} comments</span>
              <span>/{article.article_category}/</span>
              <span>by</span> {article.author.username}
            </p>
          </div>
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
