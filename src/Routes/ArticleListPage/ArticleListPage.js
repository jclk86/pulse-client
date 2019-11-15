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
import Ticker from "../../Components/Ticker/Ticker";
import TopUsersList from "../../Components/TopUsersList/TopUsersList";
import flash from "../../images/flash.png";
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
    const currentPath = this.props.location.pathname;
    const { articleList, categoriesList, votes, lightsOff } = this.context;
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
    // Date is the default ordering. It is applied even when a category is clicked, unless that category
    // is "popularity".
    const articlesSortedByDateOrVote = filteredArticles.sort(function(a, b) {
      if (currentPath.includes("/articles/categories/Popularity")) {
        return b.num_of_votes - a.num_of_votes;
      } else {
        return new Date(b.date_created) - new Date(a.date_created);
      }
    });
    return (
      <Section>
        <Ticker></Ticker>
        <div className="container_search_box hide_topbar_menu">
          <SearchBox
            role="search"
            placeholder="type here to search"
            name="search filter"
            onChange={e => this.updateSearch(e.target.value)}
            id="mobile_view_search_box"
          ></SearchBox>
        </div>
        <div className="container_topbar_menu hide_topbar_menu">
          <div className="container_dropdown_menu">
            {" "}
            <DropDownMenu categories={categoriesList}></DropDownMenu>
          </div>
          <div className="container_topbar_create_btn">
            <CreatePostButton className="create_post_btn_bg">
              CREATE POST
            </CreatePostButton>
          </div>
        </div>
        <div
          className={`container_mobile_view_top_users hide_top_users + ${
            lightsOff ? "lights_on_bg" : "lights_off_bg"
          }`}
        >
          <h3 className="mobile_top_users_title">Top Three Commenters</h3>
          <TopUsersList></TopUsersList>
        </div>
        <div className="flex_container" role="complementary">
          <div
            className={`container_top_users_list hide_top_users_list + ${
              lightsOff ? "lights_on_bg" : "container_top_users_list_lights_off"
            }`}
          >
            <h4 className="top_users_title">
              <img
                src={flash}
                className="flash_icon hide_icon"
                alt="flash icon"
              ></img>
              Top Commenters
              <img
                src={flash}
                className="flash_icon hide_icon"
                alt="flash icon"
              ></img>
            </h4>
            <TopUsersList></TopUsersList>
          </div>
          <div className="container_articles_section" role="main">
            <ArticlesList
              sortedArticles={articlesSortedByDateOrVote}
              votes={votes}
            ></ArticlesList>
          </div>
          <div
            role="complementary"
            className={`right_sidebar_menu hide_sidebar_menu + ${
              lightsOff ? "lights_on_bg" : "lights_off_bg_shadow"
            }`}
          >
            <SearchBox
              role="search"
              placeholder="type here to search"
              name="search filter"
              onChange={e => this.updateSearch(e.target.value)}
              id="desktop_view_search_box"
            ></SearchBox>
            <div className="container_sidebar_create_post_btn">
              <CreatePostButton className="create_post_btn_bg">
                CREATE POST
              </CreatePostButton>
            </div>
            <CategoriesList categories={categoriesList}></CategoriesList>
          </div>
        </div>
      </Section>
    );
  }
}

export default withRouter(ArticleListPage);
