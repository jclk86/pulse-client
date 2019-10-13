import React, { Component } from "react"
import {withRouter, NavLink} from "react-router-dom";
import {Form } from "../Utils/Utils"
import ArticleContext from "../../Context/ArticleContext"
import CommentService from "../../Services/comment-api-service"

// if button clicked, replace comment block with edit form

class EditCommentForm extends Component {
  static contextType = ArticleContext;
  static defaultProps = {
    match: { params: {} },
    comment: {},
    updateComment: () => {}
  };
  constructor(props) {
    super(props)
    this.state = {
      comment: { value:"", touched: false}
    }
  }

  componentDidMount() {
    this.setState({comment: { value: this.props.comment.content, touched: true}})
  }

  updateComment = (comment) => {
    this.setState({comment: {value: comment, touched: true}})
  }

  handleSubmit = event => {
    event.preventDefault();
    const { comment } = this.state
    const {article_id} = this.props.match.params
    const comment_id = this.props.comment.id
    const updatedComment = {
      content: comment.value
    }

    CommentService.updateComment(updatedComment, comment_id).then(() => {
      this.setState({comment: {value: "", touched: false}})
      this.props.handleEditClick()
      this.props.history.push(`/articles/${article_id}`);
    })
  }

  render() {
    return (
      <form className="EditCommentForm" onSubmit={event => this.handleSubmit(event)}>
        <label htmlFor="EditCommentForm_comment_title"
            className="label_edit_comment_form">Edit Comment</label>
        <textarea type="text" placeholder="Tell us your thoughts!" name="comment" onChange={e => this.updateComment(e.target.value)} value={this.state.comment.value}></textarea>
        <button type="submit">Submit</button>
    </form>
    )
  }
}

export default withRouter(EditCommentForm);