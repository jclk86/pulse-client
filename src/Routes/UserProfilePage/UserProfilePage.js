import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserProfile from "../../Components/UserProfile/UserProfile";
import { Section } from "../../Components/Utils/Utils";

// test if they all need withRouter
class UserProfilePage extends Component {
  render() {
    return (
      <Section>
        <UserProfile></UserProfile>
      </Section>
    );
  }
}
export default withRouter(UserProfilePage);
