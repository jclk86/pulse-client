import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import TokenService from "./Services/token-service";
import IdleService from "./Services/idle-service";
import AuthApiService from "./Services/auth-api-service";
import RegistrationPage from "./Routes/RegistrationPage/RegistrationPage";
import LoginPage from "./Routes/LoginPage/LoginPage";
import ArticleListPage from "./Routes/ArticleListPage/ArticleListPage";
import ArticlePage from "./Routes/ArticlePage/ArticlePage";
import AddArticlePage from "./Routes/AddArticlePage/AddArticlePage";
import EditArticlePage from "./Routes/EditArticlePage/EditArticlePage";
import UserAccountPage from "./Routes/UserAccountPage/UserAccountPage";
import EditUserPage from "./Routes/EditUserPage/EditUserPage";
import UserProfilePage from "./Routes/UserProfilePage/UserProfilePage";
import PublicOnlyRoute from "./Components/Utils/PublicOnlyRoute";
import PrivateOnlyRoute from "./Components/Utils/PrivateOnlyRoute";

class App extends Component {
  state = { hasError: false, lightsOff: true };

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

  toggleLights = () => {
    this.setState({ lightsOff: !this.state.lightsOff });
    console.log(this.state.lightsOff);
  };

  render() {
    const currentPath = window.location.pathname;
    return (
      <div
        className={`App + ${this.state.lightsOff ? "App" : "App_lights_off"}`}
      >
        <header className="App-header">
          {!currentPath.includes("login") &&
            !currentPath.includes("registration") && (
              <Header
                toggleLights={this.toggleLights}
                lightsOff={this.state.lightsOff}
              ></Header>
            )}
        </header>
        <Switch>
          <PublicOnlyRoute
            exact
            path={"/registration"}
            component={RegistrationPage}
          ></PublicOnlyRoute>
          <PublicOnlyRoute
            exact
            path={"/login"}
            component={LoginPage}
          ></PublicOnlyRoute>
          <Route exact path={"/articles"} component={ArticleListPage}></Route>
          <Route exact path={"/Popularity"} component={ArticleListPage}></Route>
          <Route
            exact
            path={"/articles/categories/:category_name"}
            component={ArticleListPage}
          ></Route>
          <Route
            exact
            path={"/articles/:article_id"}
            component={ArticlePage}
          ></Route>
          <PrivateOnlyRoute
            exact
            path={"/add_article"}
            component={AddArticlePage}
          ></PrivateOnlyRoute>
          <PrivateOnlyRoute
            exact
            path={"/articles/:article_id/edit_article"}
            component={EditArticlePage}
          ></PrivateOnlyRoute>
          <Route expact path={"/account"} component={UserAccountPage}></Route>
          <PrivateOnlyRoute
            exact
            path={"/edit_account"}
            component={EditUserPage}
          ></PrivateOnlyRoute>
          <Route
            exact
            path={"/profile/:username"}
            component={UserProfilePage}
          ></Route>
          <Redirect from="/" to="/login"></Redirect>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
