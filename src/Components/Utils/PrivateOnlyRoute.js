import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../../Services/token-service";

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  // Path is only accessible with token. If token is provided,
  // Component from App is passed through. If not, redirects to login page.
  return (
    <Route
      {...props}
      render={componentProps =>
        TokenService.hasAuthToken() ? (
          <Component {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: componentProps.location }
            }}
          />
        )
      }
    />
  );
}
