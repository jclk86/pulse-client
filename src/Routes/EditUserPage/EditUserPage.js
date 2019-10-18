import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import EditUserForm from "../../Components/EditUserForm/EditUserForm";

class EditUserPage extends Component {
  render() {
    return <EditUserForm></EditUserForm>;
  }
}

export default withRouter(EditUserPage);
