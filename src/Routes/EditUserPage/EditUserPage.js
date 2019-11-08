import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import EditUserForm from "../../Components/EditUserForm/EditUserForm";
import { Section } from "../../Components/Utils/Utils";
import ArticleListContext from "../../Context/ArticleListContext";
import "./EditUserPage.css";

class EditUserPage extends Component {
  static contextType = ArticleListContext;

  render() {
    const { lightsOff } = this.context;

    return (
      <Section
        className={`container_EditUserPage + ${
          lightsOff ? "EditUserPage_lights_on" : "EditUserPage_lights_off"
        }`}
      >
        <EditUserForm></EditUserForm>
      </Section>
    );
  }
}

export default withRouter(EditUserPage);
