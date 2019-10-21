import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import CategoriesListItem from "../CategoriesListItem/CategoriesListItem";

class CategoriesList extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="container_categories_list">
        <div className="container_categories_list_header">
          <h3>Select a Category</h3>
        </div>
        <ul className="categories_list">
          <NavLink to={`/articles`}>
            <li>All</li>
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

export default withRouter(CategoriesList);
