import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Logo, Moon } from "../Utils/Utils";
import TokenService from "../../Services/token-service";
import IdleService from "../../Services/idle-service";
import "./Header.css";
import PropTypes from "prop-types";

class Header extends Component {
  static defaultProps = () => {};

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  onMoonClick = () => {
    this.props.toggleLights();
  };

  render() {
    return (
      <div
        className={`header ${
          this.props.lightsOff ? "header" : "header_lights_off"
        }`}
      >
        <div className="container_header_content">
          <div className="container_logo">
            <NavLink to="/articles">
              <Logo className="top_header_logo"></Logo>
            </NavLink>
          </div>

          <div className="navbar_links">
            <div className="container_moon">
              <Moon className="header_moon" onClick={this.onMoonClick}></Moon>
            </div>
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
      </div>
    );
  }
}

Header.propTypes = {
  lightsOff: PropTypes.bool,
  toggleLights: PropTypes.func
};

export default Header;
