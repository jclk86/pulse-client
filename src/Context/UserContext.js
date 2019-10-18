import React, { Component } from "react";

export const nullUser = {
  user: {}
};

const UserContext = React.createContext({
  user: nullUser,
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  clearUser: () => {},
  updateUser: () => {}
});

export default UserContext;

export class UserProvider extends Component {
  state = {
    user: nullUser,
    error: null
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setUser = user => {
    this.setState({ user });
  };

  clearUser = () => {
    this.setUser(nullUser);
  };

  updateUser = updatedUser => {
    this.setState({
      user: updatedUser
    });
  };

  render() {
    const contextValue = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      clearUser: this.clearUser,
      updateUser: this.updateUser
    };
    return (
      <UserContext.Provider value={contextValue}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
