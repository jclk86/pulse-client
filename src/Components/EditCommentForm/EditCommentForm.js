import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form } from "../Utils/Utils";
import ArticleContext from "../../Context/ArticleContext";
import CommentService from "../../Services/comment-api-service";

// if button clicked, replace comment block with edit form
class EditCommentForm extends Component {
  static contextType = ArticleContext;
  constructor(props) {
    super(props);
    this.state = {
      article_id: this.props.article_id,
      comment: { value: "", touched: false }
    };
  }

  componentDidMount() {
    console.log(this.props.article_id);
  }

  render() {
    return (
      <Form>
        <textarea
          type="text"
          placeholder="Tell us your thoughts!"
          name="comment"
        ></textarea>
      </Form>
    );
  }
}

export default withRouter(EditCommentForm);