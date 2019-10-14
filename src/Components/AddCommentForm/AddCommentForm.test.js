import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import sinon from "sinon";
import AddCommentForm from "./AddCommentForm";
import Article from "../../Components/Article/Article";
import AuthApiService from "../../Services/auth-api-service";
import ArticleApiService from "../../Services/article-api-service";
import { mockUser, mockArticle } from "../TestHelper/MockData";

describe(`AddCommentForm Component`, () => {
  beforeAll(() => {
    AuthApiService.postUser(mockUser).then(user => {
      AuthApiService.postLogin({
        username: user.username,
        password: user.password
      });
    });

    ArticleApiService.postArticle(mockArticle);
  });

  it(`renders AddCommentForm without issues`, () => {
    const wrapper = shallow(<AddCommentForm></AddCommentForm>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("submits AddCommentForm", () => {
    const mockComment = {
      content: "test comment content",
      article_id: 1
    };
    const onSubmit = sinon.spy();
    const wrapper = mount(
      <BrowserRouter>
        <AddCommentForm onSubmit={onSubmit}></AddCommentForm>
      </BrowserRouter>
    );

    wrapper.find(".AddCommentForm").simulate("submit", {
      target: {
        content: mockComment.content,
        article_id: mockComment.article_id
      },
      preventDefault: () => {}
    });
  });
});
