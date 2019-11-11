import React, { Component } from "react";
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
import ArticleListContext from "./Context/ArticleListContext";
import NotFoundPage from "./Routes/NotFoundPage/NotFoundPage";

import "./App.css";

class App extends Component {
  static contextType = ArticleListContext;
  state = { hasError: false, loggedOut: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidMount() {
    this.setState({ loggedOut: false });
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
    this.setState({ loggedOut: true });
  };

  render() {
    const currentPath = window.location.pathname;
    const { lightsOff } = this.context;
    return (
      <div
        className={`App + ${lightsOff ? "App_lights_on" : "App_lights_off"}`}
      >
        <header className="App-header">
          {!currentPath.includes("login") &&
            !currentPath.includes("registration") && (
              <Header
                toggleLights={this.toggleLights}
                lightsOff={this.state.lightsOff}
              ></Header>
            )}
          {this.state.loggedOut &&
            !currentPath.includes("login") &&
            !currentPath.includes("registration") && (
              <p className="alert_text">You are not logged in.</p>
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
          <Route
            exact
            path={"/articles/categories/Popularity"}
            component={ArticleListPage}
          ></Route>
          <Route
            exact
            path={"/articles/categories/:category_name"}
            component={ArticleListPage}
          ></Route>
          <Route
            exact
            path={"/articles/:article_id"}
            render={props => <ArticlePage lightsOff={lightsOff}></ArticlePage>}
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
          <Redirect exact from="/" to="/login"></Redirect>
          <Route component={NotFoundPage}></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
