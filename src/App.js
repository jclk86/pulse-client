import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Route, Switch, withRouter } from "react-router-dom";
import TokenService from "./Services/token-service";
import IdleService from "./Services/idle-service";
import AuthApiService from "./Services/auth-api-service";
import RegistrationPage from "./Routes/RegistrationPage/RegistrationPage";
import LoginPage from "./Routes/LoginPage/LoginPage";
import ArticleListPage from "./Routes/ArticleListPage/ArticleListPage";
import ArticlePage from "./Routes/ArticlePage/ArticlePage";

class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.forceUpdate();
  };

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
          <Route exact path={"/articles"} component={ArticleListPage}></Route>
          <Route
            exact
            path={"/articles/:article_id"}
            component={ArticlePage}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
