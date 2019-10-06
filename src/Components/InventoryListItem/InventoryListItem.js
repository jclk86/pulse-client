import React, {Component} from "react"
import {NavLink, withRouter} from "react-router-dom"
// need to proptypes

class InventoryListItem extends Component {


  render() {
    const {article} = this.props
    return( // changethe template string 
    <NavLink role="navigation" to={`/articles/:article_id`}>
      <div className="container_article_item">
        <h2 className="article_title">{article.title}</h2>
      </div>
    </NavLink>
    )
  }
}

export default withRouter(InventoryListItem)