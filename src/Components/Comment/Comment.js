import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import TokenService from "../../Services/token-service";
import EditCommentForm from "../EditCommentForm/EditCommentForm";
import CommentService from "../../Services/comment-api-service";
import ArticleContext from "../../Context/ArticleContext";
import { DateFormatter } from "../Utils/Utils";
import PropTypes from "prop-types";
import "./Comment.css";

class Comment extends Component {
  static contextType = ArticleContext;
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }
  // Ensures edit comment form is showing/hidden.
  handleEditClick = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleCancelClick = () => {
    this.setState({ isEditing: false });
  };

  handleDeleteClick = comment_id => {
    CommentService.deleteComment(comment_id).then(() =>
      this.context.deleteComment(comment_id)
    );
  };

  render() {
    const token = TokenService.readJwtToken();
    const { comment, lightsOff } = this.props;

    return (
      <li className="list_comment_item" key={comment.id}>
        {this.state.isEditing ? (
          <EditCommentForm
            comment={comment}
            handleCancelClick={this.handleCancelClick}
            handleEditClick={this.handleEditClick}
          ></EditCommentForm>
        ) : (
          <div
            className={`container_comment_content + ${
              lightsOff ? "" : "comments_content_lights_off"
            }`}
          >
            <p className="comment_author_info">
              <NavLink
                to={`/profile/${comment.user.username}`}
                className="comment_username_link"
              >
                <span>{comment.user.username} </span>{" "}
              </NavLink>
              <span>on {DateFormatter(comment.date_created)}</span>
            </p>
            <p className="comment_content">{comment.content}</p>
            {token.user_id === comment.user.id ? (
              <div className="container_comment_btn hide">
                <button
                  type="button"
                  className="edit_comment_btn"
                  onClick={this.handleEditClick}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="delete_comment_btn"
                  onClick={() => this.handleDeleteClick(comment.id)}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        )}
      </li>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number
    })
  }),
  lightsOff: PropTypes.bool
};

export default withRouter(Comment);
