import React, { Component } from "react";
import { Form, Button, Input } from "../Utils/Utils";
import { withRouter, NavLink } from "react-router-dom";
import "./LoginForm.css";
import AuthApiService from "../../Services/auth-api-service";
import TokenService from "../../Services/token-service";
import GeolocationApiService from "../../Services/geolocation-api-service";

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  state = {
    error: null
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
    const { error } = this.state;
    return (
      <Form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div className="container_username">
          <label htmlFor="label__username" className="label_login">
            Username
          </label>
          <Input required name="username" id="LoginForm__username" />
        </div>
        <div className="container_password">
          <label htmlFor="LoginForm__password" className="label_login">
            Password
          </label>
          <Input
            required
            name="password"
            type="password"
            id="LoginForm__password"
            autoComplete="off"
          />
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
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default withRouter(LoginForm);
