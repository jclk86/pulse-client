import React, { Component } from "react";
import RegistrationForm from "../../Components/RegistrationForm/RegistrationForm";

class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  // User must sign in after registration completion.
  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <RegistrationForm
        onRegistrationSuccess={this.handleRegistrationSuccess}
      ></RegistrationForm>
    );
  }
}

export default RegistrationPage;
