import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
        <div className="container_home_btn">
          <Button
            role="navigation"
            className="user_profile_home_btn"
            onClick={this.props.history.goBack}
          >
            Return
          </Button>
        </div>
        <div className="container_user_profile_section">
          <div className="container_user_profile_image">
            <img
              src={user.image_url}
              alt={user.fullname}
              className="profile_image"
            ></img>
          </div>
          <div className="container_user_profile_info">
            <h1 className="user_profile_header">{user.fullname}</h1>
            <p>{user.profile}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
