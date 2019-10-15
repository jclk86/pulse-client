import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AuthApiService from "../../Services/auth-api-service";
import ArticleApiService from "../../Services/article-api-service";
import CommentApiService from "../../Services/comment-api-service";
import { mockUser, mockArticle, mockComment } from "../TestHelper/MockData";
import Comment from "./Comment";

describe(`Comment Component`, () => {
  beforeAll(() => {
    AuthApiService.postUser(mockUser).then(user => {
      AuthApiService.postLogin({
        username: user.username,
        password: user.password
      });
    });

    ArticleApiService.postArticle(mockArticle).then(() => {
      CommentApiService.postComment(mockComment);
    });
  });

  it("renders Comment component without issues", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Comment comment={mockComment}></Comment>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
