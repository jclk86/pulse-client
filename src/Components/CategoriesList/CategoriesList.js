import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import CategoriesListItem from "../CategoriesListItem/CategoriesListItem";
import PropTypes from "prop-types";
import "./CategoriesList.css";

class CategoriesList extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="container_categories_list">
        <div className="container_categories_list_header">
          <h3>Select a Category</h3>
        </div>
        <ul className="categories_list">
          <NavLink to={`/articles`} className="categories_all_link">
            <li>All</li>
          </NavLink>
          <NavLink to={`/Popularity`} className="categories_popularity_link">
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
