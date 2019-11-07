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
    const { lightsOff } = this.context;
    const userArticles = this.getUserArticles();
    return (
      <Section
        className={`${
          lightsOff
            ? "container_UserAccountPage_lights_on"
            : "container_UserAccountPage_lights_off"
        }`}
      >
        <div className="container_return_link">
          <NavLink
            to="/articles"
            role="navigation"
            className={`user_account_return_link + ${
              lightsOff
                ? "user_account_return_link_lights_on"
                : "user_account_return_link_lights_off"
            }`}
          >
            {" "}
            Return
          </NavLink>
        </div>
        <UserAccount></UserAccount>
        <div className="container_user_articles">
          <h2>Your Posts</h2>
          <ul className="user_article_list">
            {userArticles.map((article, i) => (
              <li key={i} className="user_article_list_item">
                <NavLink
                  to={`/articles/${article.id}`}
                  className={`${
                    lightsOff
                      ? "user_article_link_lights_on"
                      : "user_article_link_lights_off"
                  }`}
                >
                  <div id="user_article_title">{article.title}</div>
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
