import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import UserApiService from "../../Services/user-api-service";
import TokenService from "../../Services/token-service";
import { Button } from "../Utils/Utils";
import UserContext from "../../Context/UserContext";
import "./UserAccount.css";

class UserAccount extends Component {
  static contextType = UserContext;
  componentDidMount() {
    UserApiService.getUserAccount().then(this.context.setUser);
  }

  render() {
    const { user } = this.context;
    const token = TokenService.readJwtToken();
    return (
      <div className="container_user_account">
        <Button
          role="navigation"
          className="user_account_return_btn"
          onClick={this.props.history.goBack}
        >
          Return
        </Button>
        <img
          src={user.image_url}
          alt={user.fullname}
          className="profile_image"
        ></img>
        <h1>{user.fullname}</h1>
        <p>{user.profile}</p>
        <p>Logged in from: {user.location}</p>
        <div className="container_edit_btn">
          {token.user_id === user.id ? (
            <NavLink to="/edit_account">
              <Button>Edit Account</Button>
            </NavLink>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(UserAccount);
