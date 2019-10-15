import React, { Component } from "react";

const ArticleListContext = React.createContext({
  articleList: [],
  tagList: [],
  error: null,
  addArticle: () => {},
  setError: () => {},
  clearError: () => {},
  setArticleList: () => {},
  setTagList: () => {}
});
export default ArticleListContext;

export class ArticleListProvider extends Component {
  state = {
    articleList: [],
    tagList: [],
    error: null
  };

  setArticleList = articleList => {
    this.setState({ articleList });
  };

  setTagList = tagList => {
    this.setState({ tagList });
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
      tagList: this.state.tagList,
      addArticle: this.addArticle,
      setArticleList: this.setArticleList,
      setTagList: this.setTagList,
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
