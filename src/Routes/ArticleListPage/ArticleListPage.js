import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import ArticleListContext from "../../Context/ArticleListContext";
import ArticleApiService from "../../Services/article-api-service";
import CategoryApiService from "../../Services/category-api-service";
import { CreatePostButton } from "../../Components/Utils/Utils";
import CategoriesList from "../../Components/CategoriesList/CategoriesList";
import ArticlesList from "../../Components/ArticlesList/ArticlesList";
import DropDownMenu from "../../Components/DropDownMenu/DropDownMenu";
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
    CategoryApiService.getAllCategories().then(this.context.setCategoriesList);
  }

  getArticlesForCategory(articles, category_name) {
    const categoryName = category_name;
    return !categoryName
      ? articles
      : articles.filter(article => article.article_category === categoryName);
  }
  render() {
    const { articleList, categoriesList } = this.context;
    const { category_name } = this.props.match.params;
    const articlesForCategory = this.getArticlesForCategory(
      articleList,
      category_name
    );
    const articlesSortedByDate = articlesForCategory.sort(function(a, b) {
      return new Date(a.date_created) - new Date(b.date_created);
    });

    return (
      <div className="container_article_list_page">
        <div className="container_topbar_menu hide_topbar_menu">
          <div className="container_dropdown_menu">
            {" "}
            <DropDownMenu categories={categoriesList}></DropDownMenu>
          </div>
          <div className="container_topbar_create_btn">
            <CreatePostButton>CREATE POST</CreatePostButton>
          </div>
        </div>
        <div className="flex_container">
          <div className="container_articles_section">
            <ArticlesList sortedArticles={articlesSortedByDate}></ArticlesList>
          </div>

          <div className="right_sidebar_menu hide_sidebar_menu">
            <div className="container_sidebar_create_post_btn">
              <CreatePostButton>CREATE POST</CreatePostButton>
            </div>
            <CategoriesList categories={categoriesList}></CategoriesList>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ArticleListPage);
