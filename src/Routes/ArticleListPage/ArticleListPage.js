import React, { Component } from "react";
import ArticleListItem from "../../Components/ArticleListItem/ArticleListItem.js";
import { withRouter } from "react-router-dom";
import ArticleListContext from "../../Context/ArticleListContext";
import ArticleApiService from "../../Services/article-api-service";
import { CreatePostButton } from "../../Components/Utils/Utils";
import "./ArticleListPage.css";
// import TokenService from "../../Services/token-service";

class ArticleListPage extends Component {
  static contextType = ArticleListContext;
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  // if user matches, then can edit... edit button will appear under those circumstances.. it's all in the payload.
  // the conditional rendering of the button is the trick
  componentDidMount() {
    // const token = TokenService.readJwtToken()
    ArticleApiService.getAllArticles().then(this.context.setArticleList);
  }

  render() {
    console.log(this.context.articleList);
    return (
      <div className="flex_container">
        <div className="container_article_list">
          {this.context.articleList.map(article => (
            <ArticleListItem
              article={article}
              key={article.id}
            ></ArticleListItem>
          ))}
        </div>
        <div className="container_create_post_btn">
          <CreatePostButton>CREATE POST</CreatePostButton>
        </div>
      </div>
    );
  }
}

export default withRouter(ArticleListPage);
