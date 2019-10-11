import React, { Component } from "react";
import EditArticleForm from "../../Components/EditArticleForm/EditArticleForm";
import { withRouter } from "react-router-dom";
import { Section } from "../../Components/Utils/Utils";

class EditArticlePage extends Component {
  render() {
    return (
      <Section className="container_EditArticleForm">
        <EditArticleForm></EditArticleForm>
      </Section>
    );
  }
}

export default withRouter(EditArticlePage);
