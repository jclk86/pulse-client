import React, { Component } from "react";

const ArticleListContext = React.createContext({
  articleList: [],
  categoriesList: [],
  votes: [],
  comments: [],
  error: null,
  lightsOff: false,
  setComments: () => {},
  addVote: () => {},
  deleteVote: () => {},
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
    error: null,
    lightsOff: false
  };

  // The error functions below allows rendering of error messages from backend.
  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  toggleLights = () => {
    this.setState({ lightsOff: !this.state.lightsOff });
  };

  toggleLightOn = () => {
    this.setState({ lightsOff: true });
  };

  toggleLightOff = () => {
    this.setState({ lightsOff: false });
  };

  setComments = comments => {
    this.setState({ comments });
  };

  setVotes = votes => {
    this.setState({ votes });
  };

  // Searches for matching user id for existing article id to delete.
  deleteVote = (votes, article_id, user_id) => {
    let filter = { article_id: article_id, user_id: user_id };
    const result = votes.filter(vote => {
      for (let key in filter) {
        if (vote[key] !== filter[key]) return true;
      }
      return false;
    });
    this.setState({ votes: result });
  };

  addVote = vote => {
    this.setState({ votes: [...this.state.votes, vote] });
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

  render() {
    const contextValue = {
      votes: this.state.votes,
      comments: this.state.comments,
      lightsOff: this.state.lightsOff,
      deleteVote: this.deleteVote,
      addVote: this.addVote,
      setVotes: this.setVotes,
      articleList: this.state.articleList,
      categoriesList: this.state.categoriesList,
      addArticle: this.addArticle,
      setComments: this.setComments,
      setArticleList: this.setArticleList,
      setCategoriesList: this.setCategoriesList,
      toggleLights: this.toggleLights,
      toggleLightOn: this.toggleLightOn,
      toggleLightOff: this.toggleLightOff,
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
