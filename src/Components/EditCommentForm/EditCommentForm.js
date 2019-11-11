import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleContext from "../../Context/ArticleContext";
import CommentService from "../../Services/comment-api-service";
import {
  ValidationError,
  validateContent
} from "../ValidationError/ValidationError";
import PropTypes from "prop-types";
import "./EditCommentForm.css";

class EditCommentForm extends Component {
  static contextType = ArticleContext;
  static defaultProps = {
    match: { params: {} },
    comment: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      content: { value: "", touched: false }
    };
  }

  componentDidMount() {
    this.setState({
      content: { value: this.props.comment.content, touched: true }
    });
  }

  updateContent = content => {
    this.setState({ content: { value: content, touched: true } });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { content } = this.state;
    const { comment } = this.props;

    const updatedComment = {
      id: comment.id,
      article_id: comment.article_id,
      content: content.value,
      date_created: comment.date_created,
      user: {
        id: comment.user.id,
        fullname: comment.fullname,
        username: comment.user.username,
        date_modified: new Date()
      }
    };

    CommentService.updateComment(updatedComment, comment.id).then(comment => {
      this.context.updateComment(updatedComment);
      this.setState({ comment: { value: "", touched: false } });
      this.props.handleEditClick();
    });
  };

  isFormValid = () => {
    const { content } = this.state;
    return content.value;
  };

  render() {
    const { content } = this.state;
    const isValid = this.isFormValid();
    return (
      <form
        className="EditCommentForm"
        onSubmit={event => this.handleSubmit(event)}
      >
        <label
          htmlFor="EditCommentForm_comment_title"
          className="label_edit_comment_form"
        >
          Edit Comment
        </label>
        <textarea
          className="EditCommentForm_comment_box"
          type="text"
          placeholder="Tell us your thoughts!"
          name="comment"
          onChange={e => this.updateContent(e.target.value)}
          value={this.state.content.value}
        ></textarea>
        {content.touched && (
          <ValidationError message={validateContent(content.value)} />
        )}
        <div className="container_EditCommentForm_btns">
          <button
            type="submit"
            className="EditCommentForm_submit_btn"
            disabled={!isValid}
          >
            Edit
          </button>
          <button
            type="button"
            className="EditCommentForm_cancel_btn"
            onClick={this.props.handleCancelClick}
          >
            cancel
          </button>
        </div>
      </form>
    );
  }
}

EditCommentForm.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    date_created: PropTypes.string,
    user_id: PropTypes.number,
    usr: PropTypes.shape({
      username: PropTypes.string
    })
  })
};

export default withRouter(EditCommentForm);
