import React, { Component } from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import { Section, BackgroundWaterfall } from "../../Components/Utils/Utils";
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
    const destination = (location.state || {}).from || "/articles";
    history.push(destination);
  };
  render() {
    return (
      <BackgroundWaterfall>
        <Section>
          <LoginForm onLoginSuccess={this.handleLoginSuccess}></LoginForm>
        </Section>
      </BackgroundWaterfall>
    );
  }
}

export default withRouter(LoginPage);
