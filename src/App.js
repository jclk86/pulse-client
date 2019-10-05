import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Route, Switch, withRouter } from "react-router-dom";
import RegistrationPage from "./Routes/RegistrationPage/RegistrationPage";
import LoginPage from "./Routes/LoginPage/LoginPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header></Header>
        </header>
        <Switch>
          <Route
            expact
            path={"/registration"}
            component={RegistrationPage}
          ></Route>
          <Route exact path={"/login"} component={LoginPage}></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
