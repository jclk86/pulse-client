import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ArticleListContext from "../../Context/ArticleListContext";
import "./CategoriesListItem.css";

class CategoriesListItem extends Component {
  static contextType = ArticleListContext;
  static defaultProps = {
    category: {}
  };
  render() {
    const { category } = this.props;
    const { lightsOff } = this.context;
    return (
      <NavLink
        to={`/articles/categories/${category.name}`}
        className={`category_link + ${
          lightsOff ? "" : "lights_off_category_bg"
        }`}
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
