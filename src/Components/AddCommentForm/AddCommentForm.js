import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import ArticleContext from "../../Context/ArticleContext"

class AddCommentForm extends Component { 
  static contextType = ArticleContext; 
  constructor(props) {
    super(props)
    this.state = {
      comment: { value: "", touched: false }
    }
  }

  updateComment = (comment) => {
    this.setState({comment: {value: comment, touched: true}})
  }

  render() {
    return (
    <form>
      <label htmlFor="AddCommentForm_comment_title"
          className="label_add_comment_form">Add Comment</label>
      <input type="text" placeholder="Tell us your thoughts!" onChange={e => this.updateComment(e.target.value)}></input>
      <button type="submit">Submit</button>
    </form>)
  }
}

export default withRouter(AddCommentForm);