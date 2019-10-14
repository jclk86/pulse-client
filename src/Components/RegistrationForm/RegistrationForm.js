import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Form } from "../Utils/Utils";
import AuthApiService from "../../Services/auth-api-service";

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      password: { value: "", touched: false },
      email: { value: "", touched: false },
      username: { value: "", touched: false },
      fullname: { value: "", touched: false }
    };
  }

  updateFullname = fullname => {
    this.setState({ fullname: { value: fullname, touched: true } });
  };

  updateUsername = username => {
    this.setState({ username: { value: username, touched: true } });
  };

  updatePassword = password => {
    this.setState({ password: { value: password, touched: true } });
  };

  updateEmail = email => {
    this.setState({ email: { value: email, touched: true } });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { fullname, username, password, email } = event.target;
    this.setState({
      error: null,
      password: password,
      email: email,
      username: username,
      fullname: fullname
    });

    AuthApiService.postUser({
      fullname: fullname.value,
      username: username.value,
      password: password.value,
      email: email.value
    })
      .then(res => {
        fullname.value = "";
        username.value = "";
        password.value = "";
        email.value = "";
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} id="registration_form">
        <div className="fullname">
          <label
            htmlFor="RegistrationForm__fullname"
            className="label_registration"
          >
            Fullname
          </label>
          <input
            name="fullname"
            type="text"
            required
            id="RegistrationForm__fullname"
            onChange={e => this.updateFullname(e.target.value)}
          />
        </div>
        <div className="user_name">
          <label
            htmlFor="RegistrationForm__username"
            className="label_registration"
          >
            Username
          </label>
          <input
            name="username"
            type="text"
            required
            id="RegistrationForm__username"
            onChange={e => this.updateUsername(e.target.value)}
          />
        </div>
        <div className="password">
          <label
            htmlFor="RegistrationForm__password"
            className="label_registration"
          >
            Password
          </label>
          <input
            onChange={e => this.updatePassword(e.target.value)}
            name="password"
            type="password"
            id="RegistrationForm__password"
          />
        </div>
        <div className="email">
          <label
            htmlFor="RegistrationForm__email"
            className="label_registration"
          >
            Email
          </label>{" "}
          <input
            onChange={e => this.updateEmail(e.target.value)}
            name="email"
            type="text"
            required
            id="RegistrationForm__email"
          />
        </div>
        <div className="register_btn_container">
          <button id="submit_btn" type="submit">
            Submit
          </button>
        </div>
        <div className="login_link">
          <p className="message_redirect">
            Already a user?{" "}
            <NavLink to={"/login"} role="navigation" className="btn_login_link">
              Login
            </NavLink>
          </p>
        </div>
      </Form>
    );
  }
}

export default RegistrationForm;
