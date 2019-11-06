import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import ArticleApiService from "../../Services/article-api-service";
import TokenService from "../../Services/token-service";
import ArticleListContext from "../../Context/ArticleListContext";
import UserAccount from "../../Components/UserAccount/UserAccount";
import { Section, DateFormatter } from "../../Components/Utils/Utils";
import "./UserAccountPage.css";

class UserAccountPage extends Component {
  static contextType = ArticleListContext;
  componentDidMount() {
    ArticleApiService.getAllArticles().then(this.context.setArticleList);
  }

  getUserArticles = () => {
    const token = TokenService.readJwtToken();
    const { articleList } = this.context;
    return articleList.filter(article => article.author.id === token.user_id);
  };

  render() {
    const userArticles = this.getUserArticles();

    return (
      <Section>
        <UserAccount></UserAccount>
        <div className="container_user_articles">
          <h2>Your Posts</h2>
          <ul className="user_article_list">
            {userArticles.map(article => (
              <li key={article.author.id} className="user_article_list_item">
                <NavLink
                  to={`/articles/${article.id}`}
                  className="user_article_link"
                >
                  <div className="user_article_title">{article.title}</div>
                  <div className="user_article_date">
                    {" "}
                    {DateFormatter(article.date_created)}
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }
}

export default withRouter(UserAccountPage);
