import React, { Component } from "react";
import RegistrationForm from "../../Components/RegistrationForm/RegistrationForm";
import { Section } from "../../Components/Utils/Utils";

class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <Section>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        ></RegistrationForm>
      </Section>
    );
  }
}

export default RegistrationPage;
