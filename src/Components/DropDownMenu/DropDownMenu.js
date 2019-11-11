import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./DropDownMenu.css";

class DropDownMenu extends Component {
  handleSelectedCategory = category => {
    category === "all"
      ? this.props.history.push(`/articles`)
      : this.props.history.push(`/articles/categories/${category}`);
  };

  render() {
    const { categories } = this.props;
    return (
      <select
        className="select_menu"
        role="navigation"
        name="category"
        onChange={e => this.handleSelectedCategory(e.target.value)}
      >
        <option value="all" key="all">
          All
        </option>
        {categories.map(category => (
          <option value={category.name} key={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    );
  }
}

DropDownMenu.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.shape({
        name: PropTypes.string
      })
    })
  )
};

export default withRouter(DropDownMenu);
