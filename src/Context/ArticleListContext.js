import React, { Component } from "react";

const ArticleListContext = React.createContext({
  articleList: [],
  categoriesList: [],
  votes: [],
  comments: [],
  error: null,
  setComments: () => {},
  addVote: () => {},
  addArticle: () => {},
  setError: () => {},
  clearError: () => {},
  setArticleList: () => {},
  setCategoriesList: () => {}
});
export default ArticleListContext;

export class ArticleListProvider extends Component {
  state = {
    articleList: [],
    categoriesList: [],
    comments: [],
    votes: [],
    error: null
  };

  setComments = comments => {
    this.setState({ comments });
  };

  setVotes = votes => {
    this.setState({ votes });
  };

  addVote = vote => {
    this.setState({ votes: [...this.state.articleList, vote] });
  };

  setArticleList = articleList => {
    this.setState({ articleList });
  };

  setCategoriesList = categoriesList => {
    this.setState({ categoriesList });
  };

  addArticle = article => {
    this.setState({ inventoryList: [...this.state.articleList, article] });
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const contextValue = {
      votes: this.state.votes,
      comments: this.state.comments,
      addVote: this.addVote,
      setVotes: this.setVotes,
      articleList: this.state.articleList,
      categoriesList: this.state.categoriesList,
      addArticle: this.addArticle,
      setComments: this.setComments,
      setArticleList: this.setArticleList,
      setCategoriesList: this.setCategoriesList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError
    };
    return (
      <ArticleListContext.Provider value={contextValue}>
        {this.props.children}
      </ArticleListContext.Provider>
    );
  }
}
