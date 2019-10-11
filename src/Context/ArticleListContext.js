import React, { Component } from "react";

const ArticleListContext = React.createContext({
  articleList: [],
  error: null,
  addArticle: () => {},
  setError: () => {},
  clearError: () => {},
  setArticleList: () => {}
});
export default ArticleListContext;

export class ArticleListProvider extends Component {
  state = {
    articleList: [],
    error: null
  };

  setArticleList = articleList => {
    this.setState({ articleList });
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
      articleList: this.state.articleList,
      addArticle: this.addArticle,
      setArticleList: this.setArticleList,
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
