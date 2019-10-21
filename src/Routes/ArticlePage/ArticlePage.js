import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Button } from "../../Components/Utils/Utils";
import Article from "../../Components/Article/Article";
import AddCommentForm from "../../Components/AddCommentForm/AddCommentForm";
import ArticleContext from "../../Context/ArticleContext";
import ArticleApiService from "../../Services/article-api-service";
import CommentsSection from "../../Components/CommentsSection/CommentsSection";

class ArticlePage extends Component {
  static defaultProps = {
    match: { params: {} }
  };
  static contextType = ArticleContext;

  componentDidMount() {
    const { article_id } = this.props.match.params; //append catches
    ArticleApiService.getArticleById(article_id).then(this.context.setArticle);
    ArticleApiService.getCommentsForArticle(article_id).then(
      this.context.setComments
    );
  }

  render() {
    const { article, comments } = this.context;
    const { article_id } = this.props.match.params;
    console.log(comments);
    return (
      <div className="SECTION">
        <div className="container_article_page_btn">
          <NavLink to="/articles">
            <Button role="navigation" type="button">
              Return
            </Button>
          </NavLink>
        </div>
        <Article article={article}></Article>
        <div className="container_header_comments">
          <h2>Comments Section</h2>
        </div>
        <CommentsSection comments={comments}></CommentsSection>
        <AddCommentForm article_id={article_id}></AddCommentForm>
      </div>
    );
  }
}

export default withRouter(ArticlePage);
