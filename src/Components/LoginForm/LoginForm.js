import React, { Component } from "react";
import { Form, Button, Input } from "../Utils/Utils";
import { withRouter, NavLink } from "react-router-dom";
import "./LoginForm.css";
import AuthApiService from "../../Services/auth-api-service";
import TokenService from "../../Services/token-service";
import GeolocationApiService from "../../Services/geolocation-api-service";
import {
  validateUsername,
  validatePassword,
  ValidationError
} from "../ValidationError/ValidationError";

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      username: { value: "", touched: false },
      password: { value: "", touched: false }
    };
  }

  updateUsername = username => {
    this.setState({ username: { value: username, touched: true } });
  };

  updatePassword = password => {
    this.setState({ password: { value: password, touched: true } });
  };

  handleSubmitJwtAuth = event => {
    event.preventDefault();
    this.setState({ error: null });
    const { username, password } = event.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        GeolocationApiService.getUserLocation().then(location => {
          const newLocation = {
            location: `${location.city}, ${location.country_name}`
          };
          GeolocationApiService.updateUserLocation(newLocation);
        });
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error, username, password } = this.state;
    return (
      <Form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div className="container_LoginForm_username">
          <label htmlFor="label__username" className="label_login">
            Username
          </label>
          <Input
            onChange={e => this.updateUsername(e.target.value)}
            name="username"
            className="LoginForm_username"
          />
          {username.touched && (
            <ValidationError message={validateUsername(username.value)} />
          )}
        </div>
        <div className="container_LoginForm_password">
          <label htmlFor="LoginForm_password" className="label_login">
            Password
          </label>
          <Input
            onChange={e => this.updatePassword(e.target.value)}
            name="password"
            type="password"
            className="LoginForm_password"
            autoComplete="off"
          />
          {password.touched && (
            <ValidationError message={validatePassword(password.value)} />
          )}
        </div>
        <div className="container_login_register">
          <p className="message_redirect">
            Not a member?{" "}
            <NavLink
              to="/registration"
              role="navigation"
              className="btn_register_link"
            >
              Register here.
            </NavLink>
          </p>
        </div>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <Button type="submit" className="LoginForm_submit_btn">
          Submit
        </Button>
      </Form>
    );
  }
}

export default withRouter(LoginForm);
