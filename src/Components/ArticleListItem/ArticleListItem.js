import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { DateFormatter } from "../Utils/Utils";
import ThumbsUp from "../../images/thumbs-up.png";
import ThumbsDown from "../../images/thumbs-down.png";
import CommentApiService from "../../Services/comment-api-service";
import VoteApiService from "../../Services/vote-api-service";
import TokenService from "../../Services/token-service";
import ArticleListContext from "../../Context/ArticleListContext";
import PropTypes from "prop-types";
import "./ArticleListItem.css";

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
      return string.substring(0, 220) + "...";
    } else {
      return string;
    }
  }

  // Adds vote to article in DB.
  handleClickVoteUp(article_id) {
    this.context.clearError();
    VoteApiService.addVoteForArticle(article_id)
      .then(this.context.addVote)
      .catch(this.context.setError);
  }

  // Deletes vote from DB based on user id and article id.
  handleClickVoteDown(votes, article_id, user_id) {
    this.context.clearError();
    VoteApiService.deleteVote(article_id).catch(this.context.setError);
    this.context.deleteVote(votes, article_id, user_id);
  }

  render() {
    const { article } = this.props;
    const { comments, votes, error, lightsOff } = this.context;
    const numOfComments = this.getTotalComments(article.id, comments);
    // Shows beginning of article text.
    const previewText = this.ellipsify(article.content);
    const totalVotes = this.filterTotalVotes(article.id, votes);
    // Assigns 0 to articles without votes, and assigns total vote to articles with votes.
    const numOfVotes = totalVotes.length ? totalVotes.length : 0;
    // Signed-in user's id is used for voting identity.
    const token = TokenService.readJwtToken();
    const user_id = token.user_id;
    return (
      <div className="container_article_list_item">
        <div
          className={`container_article_preview +  + ${
            lightsOff ? "" : "article_list_item_lightsOff"
          }`}
        >
          <NavLink to={`/articles/${article.id}`}>
            <div className="container_article_list_item_image hide_image">
              <img
                src={`${article.image_url}`}
                alt={`${article.title}`}
                className="article_list_item_image"
              ></img>
            </div>
          </NavLink>
          <div className="container_article_text_preview">
            <div className="container_article_list_item_info">
              <NavLink
                to={`/articles/${article.id}`}
                className="article_list_item_title_link"
              >
                {" "}
                <h4
                  className={`article_list_item_title + ${
                    lightsOff ? "" : "lightsOff_text"
                  }`}
                >
                  {article.title}
                </h4>{" "}
              </NavLink>
              <p className="preview_text" role="contentinfo">
                {previewText}
              </p>
              <div className="container_article_attributes">
                <div className="article_attributes">
                  <div className="container_vote_count">
                    <p className="vote_count">
                      <span>Upvote </span>
                      <img
                        src={ThumbsUp}
                        role="button"
                        alt="vote up"
                        className="thumbs_up"
                        onClick={() => this.handleClickVoteUp(article.id)}
                      ></img>
                      {numOfVotes}
                      <img
                        src={ThumbsDown}
                        role="button"
                        alt="vote up"
                        className="thumbs_down"
                        onClick={() =>
                          this.handleClickVoteDown(votes, article.id, user_id)
                        }
                      ></img>
                      <span> Downvote</span>
                    </p>
                  </div>
                  <div className="voting_request_error">
                    {error && error.article_id === article.id && error.message}
                  </div>
                  <span>{numOfComments} comments</span>
                  <span>
                    /
                    <NavLink
                      to={`/articles/categories/${article.article_category}`}
                      className="article_attributes_category"
                    >
                      {article.article_category}
                    </NavLink>
                    /
                  </span>
                  <span>by</span>{" "}
                  <NavLink
                    to={`/profile/${article.author.username}`}
                    className={"article_attributes_username"}
                  >
                    {article.author.username}{" "}
                  </NavLink>
                  <span>on {DateFormatter(article.date_created)}</span>
                </div>
              </div>
            </div>
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
