import React, {Component } from "react";
import ArticleListItem from "../../Components/ArticleListItem/ArticleListItem.js";
import {withRouter} from "react-router-dom"
import TokenService from "../../Services/token-service"
import ArticleListContext from "../../Components/Context/ArticleListContext"
import ArticleApiService from "../../Services/article-api-service"

class ArticleListPage extends Component {
  static contextType = ArticleListContext;
  state = {
    error: null
  }

  componentDidMount() {
    // this.context.clearError
    // const token = TokenService.readJwtToken()
    ArticleApiService.getAllArticles().then(this.context.setArticleList)
  }

  render() {
    
    return (
      <div className="container_article_list">
        {this.context.articleList.map(article => (
          <ArticleListItem
          article={article}></ArticleListItem>
        ))}

      </div>
    )
  }
}

export default withRouter(ArticleListPage)