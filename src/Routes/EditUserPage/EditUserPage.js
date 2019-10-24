import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import EditUserForm from "../../Components/EditUserForm/EditUserForm";
import { Section } from "../../Components/Utils/Utils";

class EditUserPage extends Component {
  render() {
    return (
      <Section>
        <EditUserForm></EditUserForm>
      </Section>
    );
  }
}

export default withRouter(EditUserPage);
