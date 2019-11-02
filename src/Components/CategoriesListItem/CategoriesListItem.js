import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./CategoriesListItem.css";

class CategoriesListItem extends Component {
  static defaultProps = {
    category: {}
  };
  render() {
    const { category } = this.props;
    return (
      <NavLink
        to={`/articles/categories/${category.name}`}
        className="category_link"
      >
        <li>{category.name}</li>
      </NavLink>
    );
  }
}

CategoriesListItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string
  })
};

export default withRouter(CategoriesListItem);
