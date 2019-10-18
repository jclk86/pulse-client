import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Form } from "../Utils/Utils";
import AuthApiService from "../../Services/auth-api-service";
import GeolocationApiService from "../../Services/geolocation-api-service";

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
      image_url: { value: "", touched: false },
      location: null
    };
  }

  componentDidMount() {
    GeolocationApiService.getUserLocation().then(location =>
      this.setState({ location: location })
    );
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
      image_url: image_url.value,
      location: this.state.location
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
            autoComplete="off"
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
        <div className="profile">
          <label
            htmlFor="RegistrationForm__profile"
            className="label_registration"
          >
            About Me
          </label>{" "}
          <textarea
            onChange={e => this.updateProfile(e.target.value)}
            name="profile"
            type="text"
            id="RegistrationForm_profile"
            required
          ></textarea>
        </div>
        <div className="image_url">
          <label
            htmlFor="RegistrationForm__image_url"
            className="label_registration"
          >
            Image Url
          </label>{" "}
          <input
            onChange={e => this.updateImage_Url(e.target.value)}
            name="image_url"
            type="text"
            id="RegistrationForm_image_url"
          ></input>
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
