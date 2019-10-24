import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleApiService from "../../Services/article-api-service";
// import TokenService from "../../Services/token-service";
import ArticleListContext from "../../Context/ArticleListContext";
import UserAccount from "../../Components/UserAccount/UserAccount";
import { Section } from "../../Components/Utils/Utils";
// import ArticleListItem from "../../Components/ArticleListItem/ArticleListItem";
// import {renderUserArticles} from "../../Components/Utils/Utils"

class UserAccountPage extends Component {
  static contextType = ArticleListContext;
  componentDidMount() {
    ArticleApiService.getAllArticles().then(this.context.setArticleList);
  }

  render() {
    // const { articleList } = this.context;
    // const token = TokenService.readJwtToken();

    return (
      <Section>
        <UserAccount></UserAccount>
        <div className="container_user_articles"></div>
      </Section>
    );
  }
}

export default withRouter(UserAccountPage);
