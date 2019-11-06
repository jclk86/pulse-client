import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/travelist_logo.png";
import logoWhite from "../../images/travelist_logo_white.png";
import lightsOff from "../../images/lightsOff.png";
import TokenService from "../../Services/token-service";
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

export function LogoWhite({ className, ...props }) {
  return (
    <img
      src={logoWhite}
      alt="logo-white"
      className={["LogoWhite", className].join(" ")}
      {...props}
    ></img>
  );
}

export function Moon({ className, ...props }) {
  return (
    <img
      src={lightsOff}
      alt="Moon"
      className={["Moon", className].join(" ")}
      {...props}
    />
  );
}

export function BackgroundFriends({ className, ...props }) {
  return (
    <div
      className={["BackgroundFriends", className].join(" ")}
      {...props}
    ></div>
  );
}

export function SearchBox({ className, ...props }) {
  return (
    <input
      type="text"
      className={["SearchBox", className].join(" ")}
      {...props}
    ></input>
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

export function Textarea({ className, ...props }) {
  return <textarea className={["Textarea", className].join(" ")} {...props} />;
}

export function Select({ className, ...props }) {
  return (
    <select
      name="category"
      className={["Select", className].join(" ")}
      {...props}
    ></select>
  );
}

export function Label({ className, ...props }) {
  return <label className={["Label", className].join(" ")} {...props}></label>;
}

export function Required({ className, ...props }) {
  return (
    <span className={["Required", className].join(" ")} {...props}>
      &#42;
    </span>
  );
}

export function Button({ className, ...props }) {
  return (
    <button className={["Button", className].join(" ")} {...props}></button>
  );
}

export function CreatePostButton({ className, ...props }) {
  return (
    <NavLink to={TokenService.getAuthToken() ? "/add_article" : "/login"}>
      <button
        className={["CreatePostButton", className].join(" ")}
        {...props}
        type="button"
      ></button>
    </NavLink>
  );
}

export function DateFormatter(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(date).toLocaleString("en-US", options);
}

export function renderCategories(categoriesList) {
  return categoriesList.map(category => (
    <option value={category.name} key={category.name}>
      {category.name}
    </option>
  ));
}

export function sortByFrequencyAndRemoveDuplicates(array) {
  let frequency = {},
    value;

  for (let i = 0; i < array.length; i++) {
    value = array[i];
    if (value in frequency) {
      frequency[value]++;
    } else {
      frequency[value] = 1;
    }
  }

  let uniques = [];
  for (value in frequency) {
    uniques.push(value);
  }

  function compareFrequency(a, b) {
    return frequency[b] - frequency[a];
  }

  return uniques.sort(compareFrequency);
}
