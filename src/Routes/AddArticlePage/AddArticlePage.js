import React, { Component } from "react";
import AddArticleForm from "../../Components/AddArticleForm/AddArticleForm";
import { Section } from "../../Components/Utils/Utils";

export default class AddArticlePage extends Component {
  render() {
    return (
      <Section className="container_AddArticleForm">
        <AddArticleForm></AddArticleForm>
      </Section>
    );
  }
}
