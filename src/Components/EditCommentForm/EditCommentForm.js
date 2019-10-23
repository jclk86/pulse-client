import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import ArticleContext from "../../Context/ArticleContext";
import CommentService from "../../Services/comment-api-service";
// import PropTypes from "prop-types";

// if button clicked, replace comment block with edit form

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

  render() {
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
          type="text"
          placeholder="Tell us your thoughts!"
          name="comment"
          onChange={e => this.updateContent(e.target.value)}
          value={this.state.content.value}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// EditCommentForm.Proptype = {
//   comment: propTypes.shape
// }

export default withRouter(EditCommentForm);
