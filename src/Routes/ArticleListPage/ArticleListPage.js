import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleListContext from "../../Context/ArticleListContext";
import ArticleApiService from "../../Services/article-api-service";
import CategoryApiService from "../../Services/category-api-service";
import VoteApiService from "../../Services/vote-api-service";
import {
  CreatePostButton,
  Section,
  SearchBox
} from "../../Components/Utils/Utils";
import CategoriesList from "../../Components/CategoriesList/CategoriesList";
import ArticlesList from "../../Components/ArticlesList/ArticlesList";
import DropDownMenu from "../../Components/DropDownMenu/DropDownMenu";
import "./ArticleListPage.css";

class ArticleListPage extends Component {
  static contextType = ArticleListContext;
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      search: ""
    };
  }

  componentDidMount() {
    VoteApiService.getVotesForArticles().then(this.context.setVotes);
    ArticleApiService.getAllArticles().then(this.context.setArticleList);
    CategoryApiService.getAllCategories().then(this.context.setCategoriesList);
  }

  getArticlesForCategory(articles, category_name) {
    const categoryName = category_name;
    return !categoryName
      ? articles
      : articles.filter(article => article.article_category === categoryName);
  }

  updateSearch = filter => {
    this.setState({ search: filter });
  };

  render() {
    const { articleList, categoriesList, votes } = this.context;
    const { category_name } = this.props.match.params;
    const articlesForCategory = this.getArticlesForCategory(
      articleList,
      category_name
    );

    const filteredArticles = articlesForCategory.filter(article => {
      return article.title
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });
    // re-sort by popularity
    // also, impement search filter
    const articlesSortedByDate = filteredArticles.sort(function(a, b) {
      return new Date(a.date_created) - new Date(b.date_created);
    });
    return (
      <Section>
        <div className="container_topbar_menu hide_topbar_menu">
          <div className="container_dropdown_menu">
            {" "}
            <DropDownMenu categories={categoriesList}></DropDownMenu>
          </div>
          <div className="container_topbar_create_btn">
            <CreatePostButton>CREATE POST</CreatePostButton>
          </div>
          <div className="container_search_box">
            <SearchBox
              placeholder="search articles"
              name="search filter"
              onChange={e => this.updateSearch(e.target.value)}
              id="mobile_view_search_box"
            ></SearchBox>
          </div>
        </div>
        <div className="flex_container">
          <div className="container_articles_section">
            <ArticlesList
              sortedArticles={articlesSortedByDate}
              votes={votes}
            ></ArticlesList>
          </div>
          <div className="right_sidebar_menu hide_sidebar_menu">
            <SearchBox
              placeholder="search articles"
              name="search filter"
              onChange={e => this.updateSearch(e.target.value)}
              id="desktop_view_search_box"
            ></SearchBox>
            <div className="container_sidebar_create_post_btn">
              <CreatePostButton>CREATE POST</CreatePostButton>
            </div>
            <CategoriesList categories={categoriesList}></CategoriesList>
          </div>
        </div>
      </Section>
    );
  }
}

export default withRouter(ArticleListPage);
