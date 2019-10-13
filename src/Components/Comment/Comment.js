import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TokenService from "../../Services/token-service";
import EditCommentForm from "../EditCommentForm/EditCommentForm";
import CommentService from "../../Services/comment-api-service";
import "./Comment.css";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: null };
  }

  handleEditClick(index) {
    let activeIndex = this.state.activeIndex === index ? null : index;
    this.setState({ activeIndex });
  }

  // add conditional below for edit button to post form on click and if user is the right user
  // hide button unless on hover
  // sort by date. Do not change date on edit.
  // key === getbyid? comment id?
  renderComments = (comments = []) => {
    const token = TokenService.hasAuthToken()
      ? TokenService.readJwtToken()
      : "";
    const user_id = token ? token.user_id : "";

    return comments.map((comment, index) => {
      return (
        <li className="list_comment_item" id={index} key={comment.id}>
          <div className="container_comment_content">
            <span>{comment.user.username} says...</span>{" "}
            <p>{comment.content}</p>
            {user_id === comment.user.user_id ? (
              <div className="container_comment_btn hide">
                <button type="button" className="edit_comment_btn">
                  Edit
                </button>
                <button type="button" className="delete_comment_btn">
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </li>
      );
    });
  };
  render() {
    // conditional edit button needed below
    const { comments } = this.props;
    console.log(comments);
    return (
      <div className="container_comments">
        <ul>
          {this.props.comments === [] ? (
            this.renderComments(comments)
          ) : (
            <p> Add a comment!</p>
          )}
        </ul>
      </div>
    );
  }
}

export default withRouter(Comment);
