import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import TokenService from "../../Services/token-service";
import { Button } from "../Utils/Utils";
import { DateFormatter } from "../Utils/Utils";
import PropTypes from "prop-types";
import "./Article.css";

class Article extends Component {
  render() {
    const { article } = this.props;
    const token = TokenService.readJwtToken();
    const articleParagraphs = article.content
      ? article.content.split(/\s\s+/)
      : null;
    return (
      <div className="container_article">
        <div className=".container_article_image">
          <img
            src={article.image_url}
            alt="user posted"
            className="article_image"
          ></img>
        </div>
        <h2 className="article_title">{article.title}</h2>
        <p className="article_date">{DateFormatter(article.date_created)}</p>

        <p className="article_author">
          <span>By</span>{" "}
          <NavLink
            to={
              token.user_id === article.author.id
                ? `/account`
                : `/profile/${article.author.username}`
            }
            className="link_user_profile"
          >
            {article.author.username}
          </NavLink>
        </p>
        <div className="article_content">
          {articleParagraphs &&
            articleParagraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </div>
        {token.user_id === article.author.id ? (
          <NavLink to={`/articles/${article.id}/edit_article`}>
            <Button type="button" className="Article_edit_post_btn">
              Edit Post
            </Button>
          </NavLink>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    date_created: PropTypes.string
  })
};

export default withRouter(Article);
