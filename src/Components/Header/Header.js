import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../Utils/Utils";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="container_logo">
          <Logo></Logo>
        </div>
        <div className="navbar_links">
          <NavLink to="/login" className="navbar_link_login">
            Logout
          </NavLink>
          <NavLink to="/signup" className="navbar_link_signup">
            Sign Up
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Header;
