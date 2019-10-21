import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Button } from "../Utils/Utils";
import UserApiService from "../../Services/user-api-service";
import UserContext from "../../Context/UserContext";
import "./UserProfile.css";

class UserProfile extends Component {
  static contextType = UserContext;
  componentDidMount() {
    const { username } = this.props.match.params;
    UserApiService.getUserProfile(username).then(this.context.setUser);
  }

  render() {
    const { user } = this.context;

    return (
      <div className="container_user_profile">
        <Button
          role="navigation"
          className="user_profile_return_btn"
          onClick={this.props.history.goBack}
        >
          Home
        </Button>
        <img
          src={user.image_url}
          alt={user.fullname}
          className="profile_image"
        ></img>
        <h1>{user.fullname}</h1>
        <p>{user.profile}</p>
        <p>Last logged in from: {user.location}</p>
      </div>
    );
  }
}

export default withRouter(UserProfile);
