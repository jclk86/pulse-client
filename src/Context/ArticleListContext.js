import React, { Component } from "react";

const ArticleListContext = React.createContext({
  articleList: [],
  categoriesList: [],
  votes: [],
  error: null,
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
    votes: [],
    error: null
  };

  setVotes = votes => {
    this.setState({ votes });
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
      setVotes: this.setVotes,
      articleList: this.state.articleList,
      categoriesList: this.state.categoriesList,
      addArticle: this.addArticle,
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
