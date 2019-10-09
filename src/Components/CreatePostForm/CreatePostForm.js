import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleContext from "../../Context/ArticleContext";

class CreatePostForm extends Component {
  static contextType = ArticleContext;
  constructor(props) {
    super(props);
    this.state = {
      title: {
        value: "",
        touched: false
      },
      content: {
        value: "",
        touched: false
      },
      tag: {
        value: "",
        touched: false
      }
    };
  }

  updateTitle = title => {
    this.setState({ title: { value: title, touched: true } });
  };

  updateContent = content => {
    this.setState({ content: { value: content, touched: true } });
  };

  updateTag = tag => {
    this.setState({ title: { value: tag, touched: true } });
  };

  // add get all tags service here and place in context

  // handleSubmit = event => {
  //   event.preventDefault();
  //   const {
  //     title,
  //     content,
  //     tag
  //   } = this.state

  // needs userid

  // }

  render() {
    return <div></div>;
  }
}
