import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserApiService from "../../Services/user-api-service";
import { Form, Button } from "../Utils/Utils";
import {
  ValidationError,
  validatePassword,
  validateProfile,
  validateImage
} from "../ValidationError/ValidationError";

// add user context, isvalid, mount current user info
class EditUserForm extends Component {
  // registration form recieves a registration success redirect

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      password: { value: "", touched: false },
      profile: { value: "", touched: false },
      image_url: { value: "", touched: false }
    };
  }

  componentDidMount;

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
      <Form onSubmit={this.handleSubmit} id="EditUser_form">
        <div className="password">
          <label htmlFor="EditUserForm__password" className="label_edit_user">
            Password
          </label>
          <input
            onChange={e => this.updatePassword(e.target.value)}
            name="password"
            type="password"
            id="EditUserForm__password"
            autoComplete="off"
          />
          {password.touched && (
            <ValidationError message={validatePassword(password.value)} />
          )}
        </div>
        <div className="profile">
          <label htmlFor="EditUserForm__profile" className="label_edit_user">
            About Me
          </label>{" "}
          <textarea
            onChange={e => this.updateProfile(e.target.value)}
            name="profile"
            type="text"
            id="EditUserForm_profile"
            required
          ></textarea>
          {profile.touched && (
            <ValidationError message={validateProfile(profile.value)} />
          )}
        </div>
        <div className="image_url">
          <label htmlFor="EditUserForm__image_url" className="label_edit_user">
            Image Url
          </label>{" "}
          <input
            onChange={e => this.updateImage_Url(e.target.value)}
            name="image_url"
            type="text"
            id="EditUserForm_image_url"
          ></input>
          {image_url.touched && (
            <ValidationError message={validateImage(image_url.value)} />
          )}
        </div>
        <div className="edit_user_container_btn">
          <Button
            type="button"
            role="button"
            onClick={() => this.props.history.push("/account")}
          >
            Cancel
          </Button>
          <button id="submit_btn" type="submit">
            Submit
          </button>
        </div>
      </Form>
    );
  }
}

export default withRouter(EditUserForm);
