import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

class TagsListItem extends Component {
  static defaultProps = {
    tag: {}
  };
  render() {
    const { tag } = this.props;
    return (
      <NavLink to={`/articles/tag/${tag.name}`}>
        <li>{tag.name}</li>
      </NavLink>
    );
  }
}
export default withRouter(TagsListItem);
