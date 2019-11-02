import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Comment from "../Comment/Comment";
import PropTypes from "prop-types";
import "./CommentsSection.css";

class CommentsSection extends Component {
  renderComments = comments => {
    return comments.map(comment => {
      return <Comment comment={comment} key={comment.id}></Comment>;
    });
  };

  render() {
    const { comments } = this.props;

    return (
      <div className="container_comments">
        <ul className="comments_list">
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

CommentsSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string
    })
  )
};

export default withRouter(CommentsSection);
