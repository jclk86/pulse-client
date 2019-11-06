import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import AuthApiService from "../../Services/auth-api-service";
import ArticleApiService from "../../Services/article-api-service";
import { mockUsers, mockArticles, mockComments } from "../TestHelper/MockData";
import TopUsersList from "./TopUsersList";

describe(`TopUsersList Component`, () => {
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

  it("renders TopUsersList component without issues", () => {
    const wrapper = mount(
      <BrowserRouter>
        <TopUsersList comments={mockComments}></TopUsersList>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
