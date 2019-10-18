import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../Utils/Utils";
import TokenService from "../../Services/token-service";
import IdleService from "../../Services/idle-service";
import "./Header.css";

class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };
  render() {
    return (
      <div className="header">
        <div className="container_logo">
          <NavLink to="/articles">
            <Logo></Logo>
          </NavLink>
        </div>
        <div className="navbar_links">
          {TokenService.getAuthToken() ? (
            <div className="container_header_logged_in_links">
              <NavLink
                to="/account"
                role="navigation"
                className="navbar_link_account"
              >
                My Account
              </NavLink>
              <NavLink
                to="/login"
                role="navigation"
                onClick={this.handleLogoutClick}
                className="navbar_link_login"
              >
                Logout
              </NavLink>
            </div>
          ) : (
            <div className="container_header_logged_out_links">
              <NavLink
                to="/login"
                role="navigation"
                className="navbar_link_login"
              >
                Login
              </NavLink>
              <NavLink to="/signup" className="navbar_link_signup">
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
