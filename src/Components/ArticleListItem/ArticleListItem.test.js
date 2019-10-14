import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import AuthApiService from "../../Services/auth-api-service";
import ArticleApiService from "../../Services/article-api-service";
import { mockUser, mockArticle } from "../TestHelper/MockData";
import ArticleListItem from "./ArticleListItem";

describe(`ArticleListItem Component`, () => {
  beforeAll(() => {
    AuthApiService.postUser(mockUser).then(user => {
      AuthApiService.postLogin({
        username: user.username,
        password: user.password
      });
    });

    ArticleApiService.postArticle(mockArticle);
  });

  it("renders ArticleListItem component without issues", () => {
    const wrapper = mount(
      <BrowserRouter>
        <ArticleListItem article={mockArticle}></ArticleListItem>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
