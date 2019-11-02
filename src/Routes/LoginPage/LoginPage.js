import React, { Component } from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
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
    return <LoginForm onLoginSuccess={this.handleLoginSuccess}></LoginForm>;
  }
}

export default withRouter(LoginPage);
