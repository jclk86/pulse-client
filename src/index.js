import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ArticleListProvider } from "./Context/ArticleListContext";
import { ArticleProvider } from "./Context/ArticleContext";
import { UserProvider } from "./Context/UserContext";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <ArticleListProvider>
      <ArticleProvider>
        <UserProvider>
          {" "}
          <App />
        </UserProvider>
      </ArticleProvider>
    </ArticleListProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
