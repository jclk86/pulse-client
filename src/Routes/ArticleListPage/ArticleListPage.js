import React, { Component } from "react";
import ArticleListItem from "../../Components/ArticleListItem/ArticleListItem";
import { withRouter, NavLink } from "react-router-dom";
import ArticleListContext from "../../Context/ArticleListContext";
import ArticleApiService from "../../Services/article-api-service";
import TagApiService from "../../Services/tag-api-service";
import { CreatePostButton } from "../../Components/Utils/Utils";
import TagListItem from "../../Components/TagListItem/TagListItem";
import "./ArticleListPage.css";

class ArticleListPage extends Component {
  static contextType = ArticleListContext;
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentDidMount() {
    ArticleApiService.getAllArticles().then(this.context.setArticleList);
    TagApiService.getAllTags().then(this.context.setTagList);
  }

  getArticlesForTag(articles, tag_name) {
    const tagName = tag_name;
    return !tagName
      ? articles
      : articles.filter(article => article.article_tag === tagName);
  }
  render() {
    const { articleList } = this.context;
    const { tag_name } = this.props.match.params;
    const articlesForTag = this.getArticlesForTag(articleList, tag_name);
    const articlesSortedByDate = articlesForTag.sort(function(a, b) {
      return new Date(a.date_created) - new Date(b.date_created);
    });

    return (
      <div className="flex_container">
        <div className="container_article_list">
          {articlesSortedByDate.map(article => (
            <ArticleListItem
              article={article}
              key={article.id}
            ></ArticleListItem>
          ))}
        </div>
        <div className="right_sidebar_menu">
          <div className="container_create_post_btn">
            <CreatePostButton>CREATE POST</CreatePostButton>
          </div>
          <div className="container_tags_list">
            <div className="container_tags_list_header">
              <h3>Select a Category</h3>
            </div>
            <ul className="tags_list">
              <NavLink to={`/articles`}>
                <li>All</li>
              </NavLink>
              {this.context.tagList.map(tag => (
                <TagListItem tag={tag} key={tag.name}></TagListItem>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ArticleListPage);
