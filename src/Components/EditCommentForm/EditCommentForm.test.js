import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import sinon from "sinon";
import toJson from "enzyme-to-json";
import AuthApiService from "../../Services/auth-api-service";
import ArticleApiService from "../../Services/article-api-service";
import CommentApiService from "../../Services/comment-api-service";
import { mockUser, mockArticle, mockComment } from "../TestHelper/MockData";
import EditCommentForm from "./EditCommentForm";

describe(`EditCommentForm`, () => {
  beforeAll(() => {
    AuthApiService.postUser(mockUser).then(user => {
      AuthApiService.postLogin({
        username: user.username,
        password: user.password
      });
    });

    ArticleApiService.postArticle(mockArticle).then(() =>
      ArticleApiService.getArticleById(mockArticle.id).then(() => {
        CommentApiService.getCommentById(mockComment.id);
      })
    );
  });
  it("renders EditCommentForm without issues", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <EditCommentForm></EditCommentForm>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("submits EditCommentForm", () => {
    const onSubmit = sinon.spy();
    const wrapper = mount(
      <BrowserRouter>
        <EditCommentForm onSubmit={onSubmit}></EditCommentForm>
      </BrowserRouter>
    );

    wrapper.find(".EditCommentForm").simulate("submit", {
      target: {
        content: mockComment.content,
        article_id: mockComment.article_id,
        user: {
          id: 1
        }
      },
      preventDefault: () => {}
    });
  });
});
