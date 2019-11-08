import React, { Component } from "react";

export const nullArticle = {
  author: {},
  category: []
};

const ArticleContext = React.createContext({
  article: nullArticle,
  comments: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setArticle: () => {},
  clearArticle: () => {},
  setComments: () => {},
  addComment: () => {},
  updateComment: () => {},
  deleteComment: () => {}
});

export default ArticleContext;

export class ArticleProvider extends Component {
  state = {
    article: nullArticle,
    comments: [],
    error: null
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setArticle = article => {
    this.setState({ article });
  };

  clearArticle = () => {
    this.setArticle(nullArticle);
    this.setComments([]);
  };

  setComments = comments => {
    this.setState({ comments });
  };

  addComment = comment => {
    this.setComments([...this.state.comments, comment]);
  };

  updateComment = updatedComment => {
    this.setState({
      comments: this.state.comments.map(comment =>
        comment.id !== updatedComment.id ? comment : updatedComment
      )
    });
  };

  deleteComment = deletedCommentId => {
    this.setState({
      comments: this.state.comments.filter(
        comment => comment.id !== deletedCommentId
      )
    });
  };
  render() {
    const contextValue = {
      article: this.state.article,
      comments: this.state.comments,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setArticle: this.setArticle,
      setComments: this.setComments,
      setVotes: this.setVotes,
      clearArticle: this.clearArticle,
      addComment: this.addComment,
      updateComment: this.updateComment,
      deleteComment: this.deleteComment
    };
    return (
      <ArticleContext.Provider value={contextValue}>
        {this.props.children}
      </ArticleContext.Provider>
    );
  }
}
