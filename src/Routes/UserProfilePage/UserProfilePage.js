import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import UserProfile from "../../Components/UserProfile/UserProfile";
import ArticleListContext from "../../Context/ArticleListContext";
import ArticleApiService from "../../Services/article-api-service";
import { Section, DateFormatter, Button } from "../../Components/Utils/Utils";
import "./UserProfilePage.css";

class UserProfilePage extends Component {
  static contextType = ArticleListContext;
  componentDidMount() {
    ArticleApiService.getAllArticles().then(this.context.setArticleList);
  }

  getUserArticles = () => {
    const { articleList } = this.context;
    return articleList.filter(
      article => article.author.username === this.props.match.params.username
    );
  };

  render() {
    const { lightsOff } = this.context;
    const userArticles = this.getUserArticles();
    return (
      <Section
        className={`container_UserProfilePage + ${
          lightsOff
            ? "container_UserProfilePage_lights_on"
            : "container_UserProfilePage_lights_off"
        }`}
      >
        <div
          className={`${
            lightsOff
              ? "container_user_profile_page_return_btn_lights_on"
              : "container_user_profile_page_return_btn_lights_off"
          }`}
        >
          <Button
            role="navigation"
            className={`user_profile_page_return_btn + ${
              lightsOff
                ? "user_profile_page_return_btn_lights_on"
                : "user_profile_page_return_btn_lights_off"
            }`}
            onClick={this.props.history.goBack}
          >
            Return
          </Button>
        </div>
        <UserProfile></UserProfile>
        <div className="container_user_articles">
          <h2>User's Posts</h2>
          <ul className="user_article_list">
            {userArticles.map(article => (
              <li
                key={article.author.username}
                className="user_article_list_item"
              >
                <NavLink
                  to={`/articles/${article.id}`}
                  className={`user_article_link + ${
                    lightsOff
                      ? "user_article_link_lights_on"
                      : "user_article_link_lights_off"
                  }`}
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
export default withRouter(UserProfilePage);
