import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Comment from "../Comment/Comment";

class CommentsSection extends Component {
  renderComments = comments => {
    return comments.map(comment => {
      return <Comment comment={comment} key={comment.id}></Comment>;
    });
  };

  render() {
    const { comments } = this.props;
    console.log(comments)
    return (
      <div className="container_comments">
        <ul>
          {comments.length ? (
            this.renderComments(comments)
          ) : (
            <p>Add a comment!</p>
          )}
        </ul>
      </div>
    );
  }
}

export default withRouter(CommentsSection);
