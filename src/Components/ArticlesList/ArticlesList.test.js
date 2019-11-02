import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import AuthApiService from "../../Services/auth-api-service";
import ArticleApiService from "../../Services/article-api-service";
import { mockUsers, mockArticles } from "../TestHelper/MockData";
import ArticlesList from "./ArticlesList";

describe(`ArticlesList Component`, () => {
  beforeAll(() => {
    for (let i = 0; i < mockUsers.length; i++) {
      AuthApiService.postUser(mockUsers[i]).then(user => {
        AuthApiService.postLogin({
          username: user.username,
          password: user.password
        }).then(() => ArticleApiService.postArticle(mockArticles[i]));
      });
    }
  });

  it("renders ArticlesList component without issues", () => {
    const wrapper = mount(
      <BrowserRouter>
        <ArticlesList sortedArticles={mockArticles}></ArticlesList>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
