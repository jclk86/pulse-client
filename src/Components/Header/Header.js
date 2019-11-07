import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Logo, LogoWhite, Moon } from "../Utils/Utils";
import TokenService from "../../Services/token-service";
import IdleService from "../../Services/idle-service";
import "./Header.css";
import PropTypes from "prop-types";
import ArticleListContext from "../../Context/ArticleListContext";

class Header extends Component {
  static contextType = ArticleListContext;
  static defaultProps = () => {};

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  onMoonClick = () => {
    this.context.toggleLights();
  };

  onLightClick = () => {
    this.context.toggleLightOn();
  };

  onDarkClick = () => {
    this.context.toggleLightOff();
  };

  render() {
    const { lightsOff } = this.context;
    return (
      <div className={`header ${lightsOff ? "" : "header_lights_off"}`}>
        <div className="container_header_content">
          <div className="container_logo">
            <NavLink to="/articles">
              {lightsOff ? (
                <Logo className="top_header_logo"></Logo>
              ) : (
                <LogoWhite className="top_header_logo"></LogoWhite>
              )}
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
                  id={`${lightsOff ? "" : "lights_off_text"}`}
                >
                  Account
                </NavLink>
                <NavLink
                  to="/login"
                  role="navigation"
                  onClick={this.handleLogoutClick}
                  className="navbar_link_login"
                  id={`${lightsOff ? "" : "lights_off_text"}`}
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
                  id={`${lightsOff ? "" : "lights_off_text"}`}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="navbar_link_signup"
                  id={`${lightsOff ? "" : "lights_off_text"}`}
                >
                  Sign Up
                </NavLink>
              </div>
            )}
            <div className="light_switch">
              {lightsOff ? (
                <div className="light_switch_off">
                  <span onClick={this.onLightClick}>Light </span>|{" "}
                  <span className="light_switch_on" onClick={this.onDarkClick}>
                    Dark
                  </span>
                </div>
              ) : (
                <div className="light_switch_on">
                  <span
                    className="light_switch_off"
                    onClick={this.onLightClick}
                  >
                    Light{" "}
                  </span>
                  | <span onClick={this.onDarkClick}>Dark</span>
                </div>
              )}
            </div>
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
