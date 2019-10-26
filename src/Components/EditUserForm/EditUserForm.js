import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserApiService from "../../Services/user-api-service";
import { Form } from "../Utils/Utils";
import {
  ValidationError,
  validatePassword,
  validateProfile,
  validateImage
} from "../ValidationError/ValidationError";
import UserContext from "../../Context/UserContext";
import "./EditUserForm.css";

// add user context, isvalid, mount current user info
class EditUserForm extends Component {
  // registration form recieves a registration success redirect
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      password: { value: "", touched: false },
      profile: { value: "", touched: false },
      image_url: { value: "", touched: false }
    };
  }

  componentDidMount() {
    UserApiService.getUserAccount().then(user => {
      this.context.setUser(user);
      this.setState({
        profile: { value: user.profile, touched: true },
        image_url: { value: user.image_url, touched: true }
      });
    });
  }

  updatePassword = password => {
    this.setState({ password: { value: password, touched: true } });
  };

  updateProfile = profile => {
    this.setState({ profile: { value: profile, touched: true } });
  };

  updateImage_Url = image_url => {
    this.setState({ image_url: { value: image_url, touched: true } });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { password, profile, image_url } = event.target;
    this.setState({
      error: null,
      password: password,
      profile: profile,
      image_url: image_url
    });

    UserApiService.updateUserAccount({
      password: password.value,
      profile: profile.value,
      image_url: image_url.value
        ? image_url.value
        : "https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    })
      .then(res => {
        password.value = "";
        profile.value = "";
        image_url.value = "";
        this.props.history.push("/account");
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };
  render() {
    const { password, profile, image_url } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="EditUserForm">
        <div className="container_EditUserForm_password">
          <h2>Edit Account Information</h2>
          <div className="password">
            <label htmlFor="EditUserForm_password" className="label_edit_user">
              Password
            </label>
            <input
              value={password.value}
              onChange={e => this.updatePassword(e.target.value)}
              name="password"
              type="password"
              className="EditUserForm_password"
              autoComplete="off"
            />
            {password.touched && (
              <ValidationError message={validatePassword(password.value)} />
            )}
          </div>
        </div>
        <div className="container_EditUserForm_profile">
          <label htmlFor="EditUserForm_profile" className="label_edit_user">
            About Me
          </label>{" "}
          <textarea
            defaultValue={profile.value}
            onChange={e => this.updateProfile(e.target.value)}
            name="profile"
            type="text"
            className="EditUserForm_profile"
            required
          ></textarea>
          {profile.touched && (
            <ValidationError message={validateProfile(profile.value)} />
          )}
        </div>
        <div className="container_EditUserForm_image_url">
          <label htmlFor="EditUserForm_image_url" className="label_edit_user">
            Image Url
          </label>{" "}
          <input
            value={image_url.value}
            onChange={e => this.updateImage_Url(e.target.value)}
            name="image_url"
            type="text"
            className="EditUserForm_image_url"
          ></input>
          {image_url.touched && (
            <ValidationError message={validateImage(image_url.value)} />
          )}
        </div>
        <div className="container_EditUserForm_btns">
          <button
            type="button"
            className="EditUserForm_cancel_btn"
            onClick={() => this.props.history.push("/account")}
          >
            Cancel
          </button>
          <button className="EditUserForm_submit_btn" type="submit">
            Submit
          </button>
        </div>
      </Form>
    );
  }
}

export default withRouter(EditUserForm);
