import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./DropDownMenu.css";

class DropDownMenu extends Component {
  handleSelectedCategory = category => {
    category == "all"
      ? this.props.history.push(`/articles`)
      : this.props.history.push(`/articles/categories/${category}`);
  };

  render() {
    const { categories } = this.props;
    return (
      <select
        className="select_menu"
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

export default withRouter(DropDownMenu);
