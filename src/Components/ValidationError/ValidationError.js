import React from "react";

export function validatePassword(fieldValue) {
  const passFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,72}$/;
  if (!fieldValue.match(passFormat)) {
    return "Must be between 9 and 72 characters, and include at least one upper case, lower case, number and special character";
  }
}

export function validateCategory(fieldValue) {
  if (!fieldValue) {
    return "Please select a category";
  }
}

export function validateTitle(fieldValue) {
  if (!fieldValue) {
    return "Please enter a title";
  }
}

export function validateImage(fieldValue) {
  if (!fieldValue) {
    return "Please provide an image";
  }
}

export function validateContent(fieldValue) {
  if (!fieldValue) {
    return "Please enter content";
  }
}

export function validateProfile(fieldValue) {
  if (!fieldValue) {
    return "Please enter profile";
  }
}

export function validateEmail(fieldValue) {
  const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailFormat.test(fieldValue)) {
    return "Please enter a valid email format";
  }
}

export function ValidationError(props) {
  if (props.message) {
    return <div className="error">{props.message}</div>;
  }
  return <></>;
}
