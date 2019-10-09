import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/travelist_logo.png";
import "./Utils.css";

export function Logo({ className, ...props }) {
  return (
    <img
      src={logo}
      alt="logo"
      className={["Logo", className].join(" ")}
      {...props}
    ></img>
  );
}

export function Form({ className, ...props }) {
  return <form className={["Form", className].join(" ")} {...props}></form>;
}

export function Section({ className, ...props }) {
  return <div className={["Section", className].join(" ")} {...props}></div>;
}

export function Input({ className, ...props }) {
  return <input className={["Input", className].join(" ")} {...props}></input>;
}

export function FormLabel({ className, ...props }) {
  return (
    <label className={["FormLabel", className].join(" ")} {...props}></label>
  );
}

export function Button({ className, ...props }) {
  return (
    <button className={["Button", className].join(" ")} {...props}></button>
  );
}

export function CreatePostButton({ className, ...props }) {
  return (
    <NavLink to={"/create_post"}>
      <button
        className={["CreatePostButton", className].join(" ")}
        {...props}
        type="button"
      ></button>
    </NavLink>
  );
}
