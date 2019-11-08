import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import CategoriesListItem from "../CategoriesListItem/CategoriesListItem";
import PropTypes from "prop-types";
import ArticleListContext from "../../Context/ArticleListContext";
import "./CategoriesList.css";

class CategoriesList extends Component {
  static contextType = ArticleListContext;
  render() {
    const { categories } = this.props;
    const { lightsOff } = this.context;
    return (
      <div
        className={`container_categories_list + ${
          lightsOff ? "" : "lights_off_bg"
        }`}
      >
        <div className="container_categories_list_header">
          <h4>Select a Category</h4>
        </div>
        <ul className="categories_list">
          <NavLink
            to={`/articles`}
            className={`categories_all_link + ${
              lightsOff ? "" : "lights_off_link_bg"
            }`}
          >
            <li>All</li>
          </NavLink>
          <NavLink
            to={`/Popularity`}
            className={`categories_popularity_link + ${
              lightsOff ? "" : "lights_off_link_bg"
            }`}
          >
            <li>Popularity</li>
          </NavLink>
          {categories.map(category => (
            <CategoriesListItem
              category={category}
              key={category.name}
            ></CategoriesListItem>
          ))}
        </ul>
      </div>
    );
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  )
};

export default withRouter(CategoriesList);
