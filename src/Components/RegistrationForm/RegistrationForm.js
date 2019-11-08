import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Form, Input, Logo } from "../Utils/Utils";
import AuthApiService from "../../Services/auth-api-service";
import {
  ValidationError,
  validatePassword,
  validateProfile,
  validateFullname,
  validateUsername,
  validateEmail
} from "../ValidationError/ValidationError";
import "./RegistrationForm.css";

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
      fullname: { value: "", touched: false },
      profile: { value: "", touched: false },
      image_url: { value: "", touched: false }
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

  updateProfile = profile => {
    this.setState({ profile: { value: profile, touched: true } });
  };

  updateImage_Url = image_url => {
    this.setState({ image_url: { value: image_url, touched: true } });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      fullname,
      username,
      password,
      email,
      profile,
      image_url
    } = event.target;
    this.setState({
      error: null,
      password: password,
      email: email,
      username: username,
      fullname: fullname,
      profile: profile,
      image_url: image_url
        ? image_url
        : "https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    });

    AuthApiService.postUser({
      fullname: fullname.value,
      username: username.value,
      password: password.value,
      email: email.value,
      profile: profile.value,
      image_url: image_url.value
    })
      .then(res => {
        fullname.value = "";
        username.value = "";
        password.value = "";
        email.value = "";
        profile.value = "";
        image_url.value = "";
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  isFormValid = () => {
    const { username, fullname, password, email, profile } = this.state;
    return (
      username.value && fullname.value,
      password.value,
      email.value,
      profile.value
    );
  };

  render() {
    const { error, password, email, username, fullname, profile } = this.state;
    const isValid = this.isFormValid();
    return (
      <div className="container_registration_page">
        <div className="container_registration_form">
          <Form onSubmit={this.handleSubmit} className="RegistrationForm">
            <Logo className="logo_registration"></Logo>
            <h2 id="header_registration_form">Registration</h2>
            <div className="container_RegistrationForm_fullname">
              <label
                htmlFor="RegistrationForm_fullname"
                id="label_registration_fullname"
              >
                Fullname
              </label>
              <Input
                name="fullname"
                type="text"
                className="RegistrationForm_fullname"
                onChange={e => this.updateFullname(e.target.value)}
              />
              {fullname.touched && (
                <ValidationError message={validateFullname(fullname.value)} />
              )}
            </div>
            <div className="container_RegistrationForm_username">
              <label
                htmlFor="RegistrationForm_username"
                id="label_registration_username"
              >
                Username
              </label>
              <Input
                name="username"
                type="text"
                className="RegistrationForm_username"
                onChange={e => this.updateUsername(e.target.value)}
              />
              {username.touched && (
                <ValidationError message={validateUsername(username.value)} />
              )}
            </div>
            <div className="container_RegistrationForm_password">
              <label
                htmlFor="RegistrationForm_password"
                id="label_registration_password"
              >
                Password
              </label>
              <Input
                onChange={e => this.updatePassword(e.target.value)}
                name="password"
                type="password"
                className="RegistrationForm_password"
                autoComplete="off"
              />
              {password.touched && (
                <ValidationError message={validatePassword(password.value)} />
              )}
            </div>
            <div className="container_RegistrationForm_email">
              <label
                htmlFor="RegistrationForm_email"
                id="label_registration_email"
              >
                Email
              </label>{" "}
              <Input
                onChange={e => this.updateEmail(e.target.value)}
                name="email"
                type="text"
                className="RegistrationForm_email"
              />
              {email.touched && (
                <ValidationError message={validateEmail(email.value)} />
              )}
            </div>
            <div className="container_RegistrationForm_profile">
              <label
                htmlFor="RegistrationForm_profile"
                id="label_registration_profile"
              >
                About Me
              </label>{" "}
              <textarea
                onChange={e => this.updateProfile(e.target.value)}
                name="profile"
                type="text"
                className="RegistrationForm_profile"
              ></textarea>
              {profile.touched && (
                <ValidationError message={validateProfile(profile.value)} />
              )}
            </div>
            <div className="container_RegistrationForm_image_url">
              <label
                htmlFor="RegistrationForm_image_url"
                id="label_registration_image_url"
              >
                Image Url
              </label>{" "}
              <Input
                onChange={e => this.updateImage_Url(e.target.value)}
                name="image_url"
                type="text"
                className="RegistrationForm_image_url"
              ></Input>
            </div>
            <div role="alert">{error && <p className="red">{error}</p>}</div>
            <div className="container_RegistrationForm_btn">
              <button
                className="RegistrationForm_submit_btn"
                type="submit"
                disabled={!isValid}
              >
                Submit
              </button>
            </div>
            <div className="container_RegistrationForm_login_link">
              <p id="message_redirect">
                Already a user?{" "}
                <NavLink
                  to={"/login"}
                  role="navigation"
                  className="RegistrationForm_login_link"
                >
                  Login
                </NavLink>
              </p>
            </div>
          </Form>
        </div>
        <div className="bg_desktop_view_registration_page">
          {" "}
          <div className="container_desktop_view_registration_hero">
            <h3>
              Become a part of our community with a simple sign-up for a free
              account.
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
