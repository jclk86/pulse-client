import React, { Component } from "react";
import EditArticleForm from "../../Components/EditArticleForm/EditArticleForm";
import { withRouter } from "react-router-dom";
import { Section } from "../../Components/Utils/Utils";
import ArticleListContext from "../../Context/ArticleListContext";

class EditArticlePage extends Component {
  static contextType = ArticleListContext;
  render() {
    const { lightsOff } = this.context;
    return (
      <Section>
        <EditArticleForm lightsOff={lightsOff}></EditArticleForm>
      </Section>
    );
  }
}

export default withRouter(EditArticlePage);
