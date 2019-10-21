import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

class CategoriesListItem extends Component {
  static defaultProps = {
    category: {}
  };
  render() {
    const { category } = this.props;
    return (
      <NavLink to={`/articles/categories/${category.name}`}>
        <li>{category.name}</li>
      </NavLink>
    );
  }
}
export default withRouter(CategoriesListItem);
