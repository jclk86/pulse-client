import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleContext from "../../Context/ArticleContext";
import CommentService from "../../Services/comment-api-service";
import PropTypes from "prop-types";
import "./AddCommentForm.css";

class AddCommentForm extends Component {
  static contextType = ArticleContext;
  constructor(props) {
    super(props);
    this.state = {
      article_id: this.props.article_id,
      comment: { value: "", touched: false }
    };
  }

  updateComment = comment => {
    this.setState({ comment: { value: comment, touched: true } });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { comment, article_id } = this.state;
    const newComment = {
      content: comment.value,
      article_id
    };

    CommentService.postComment(newComment)
      .then(this.context.addComment)
      .then(() => {
        this.setState({ comment: { value: "", touched: false } });
        this.props.history.push(`/articles/${article_id}`);
      });
  };
  render() {
    return (
      <form
        className="AddCommentForm"
        onSubmit={event => this.handleSubmit(event)}
      >
        <label
          htmlFor="AddCommentForm_comment_title"
          className="label_add_comment_form"
        >
          Add Comment:
        </label>
        <textarea
          type="text"
          placeholder="Tell us your thoughts!"
          name="comment"
          className="AddCommentForm_comment_box"
          onChange={e => this.updateComment(e.target.value)}
          value={this.state.comment.value}
        ></textarea>
        <button type="submit" className="AddCommentForm_submit_btn">
          Submit
        </button>
      </form>
    );
  }
}

AddCommentForm.propTypes = {
  article_id: PropTypes.string
};

export default withRouter(AddCommentForm);
