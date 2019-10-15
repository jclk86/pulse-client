import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AddArticleForm from "./AddArticleForm";
import AuthApiService from "../../Services/auth-api-service";
import { mockUser, mockArticle } from "../TestHelper/MockData";
import sinon from "sinon";

describe(`AddArticleForm Component`, () => {
  beforeAll(() => {
    AuthApiService.postUser(mockUser).then(user => {
      AuthApiService.postLogin({
        username: user.username,
        password: user.password
      });
    });
  });

  it("renders AddArticleForm without issues", () => {
    const wrapper = shallow(<AddArticleForm></AddArticleForm>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("submits AddArticleForm", () => {
    const onSubmit = sinon.spy();
    const wrapper = mount(
      <BrowserRouter>
        <AddArticleForm onSubmit={onSubmit}></AddArticleForm>
      </BrowserRouter>
    );
    wrapper.find("Form").simulate("submit", {
      target: {
        title: mockArticle.title,
        content: mockArticle.content,
        article_tag: mockArticle.article_tag
      },
      preventDefault: () => {}
    });
  });
});
