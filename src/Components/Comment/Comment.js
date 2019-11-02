import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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

  handleEditClick = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleDeleteClick = comment_id => {
    CommentService.deleteComment(comment_id).then(() =>
      this.context.deleteComment(comment_id)
    );
  };

  render() {
    const token = TokenService.readJwtToken();
    const { comment } = this.props;

    return (
      <li className="list_comment_item" key={comment.id}>
        {this.state.isEditing ? (
          <EditCommentForm
            comment={comment}
            handleEditClick={this.handleEditClick}
          ></EditCommentForm>
        ) : (
          <div className="container_comment_content">
            <p className="comment_author_info">
              <span>{comment.user.username} on </span>{" "}
              <span>{DateFormatter(comment.date_created)}</span>
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
  })
};

export default withRouter(Comment);
