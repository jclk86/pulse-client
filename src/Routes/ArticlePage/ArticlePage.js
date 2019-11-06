import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Section } from "../../Components/Utils/Utils";
import Article from "../../Components/Article/Article";
import AddCommentForm from "../../Components/AddCommentForm/AddCommentForm";
import ArticleContext from "../../Context/ArticleContext";
import ArticleApiService from "../../Services/article-api-service";
import CommentsSection from "../../Components/CommentsSection/CommentsSection";
import PropTypes from "prop-types";
import "./ArticlePage.css";

class ArticlePage extends Component {
  static contextType = ArticleContext;
  static defaultProps = {
    match: { params: {} }
  };

  componentDidMount() {
    const { article_id } = this.props.match.params;
    ArticleApiService.getArticleById(article_id).then(this.context.setArticle);
    ArticleApiService.getCommentsForArticle(article_id).then(
      this.context.setComments
    );
  }

  render() {
    const { article, comments } = this.context;
    const { article_id } = this.props.match.params;
    const { lightsOff } = this.props;
    return (
      <Section>
        <div className="container_article_page_return_link">
          <NavLink
            to="/articles"
            className={`article_page_return_link + ${
              lightsOff ? "" : "lights_off_return_btn"
            }`}
          >
            Return
          </NavLink>
        </div>
        <Article article={article} lightsOff={lightsOff}></Article>
        <div className="container_header_comments">
          <h3>{comments.length} Comments </h3>
        </div>
        <CommentsSection
          comments={comments}
          lightsOff={lightsOff}
        ></CommentsSection>
        <AddCommentForm
          article_id={article_id}
          lightsOff={lightsOff}
        ></AddCommentForm>
      </Section>
    );
  }
}

ArticlePage.propTypes = {
  lightsOff: PropTypes.bool
};

export default withRouter(ArticlePage);
