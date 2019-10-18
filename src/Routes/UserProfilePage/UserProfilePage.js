import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserProfile from "../../Components/UserProfile/UserProfile";
// test if they all need withRouter
class UserProfilePage extends Component {
  render() {
    return <UserProfile></UserProfile>;
  }
}
export default withRouter(UserProfilePage);
