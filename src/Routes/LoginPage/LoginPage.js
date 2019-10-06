import React, { Component } from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import { Section } from "../../Components/Utils/Utils";
import { withRouter } from "react-router-dom";

class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };
  render() {
    return (
      <Section>
        <LoginForm onLoginSuccess={this.handleLoginSuccess}></LoginForm>
      </Section>
    );
  }
}

export default withRouter(LoginPage);
