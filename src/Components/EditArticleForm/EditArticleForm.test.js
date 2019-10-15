import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import sinon from "sinon";
import toJson from "enzyme-to-json";
import AuthApiService from "../../Services/auth-api-service";
import ArticleApiService from "../../Services/article-api-service";
import { mockUser, mockArticle } from "../TestHelper/MockData";
import EditArticleForm from "./EditArticleForm";

describe(`EditArticleForm Component`, () => {
  beforeAll(() => {
    AuthApiService.postUser(mockUser).then(user => {
      AuthApiService.postLogin({
        username: user.username,
        password: user.password
      });
    });

    ArticleApiService.postArticle(mockArticle).then(() =>
      ArticleApiService.getArticleById(mockArticle.id)
    );
  });

  it("renders EditArticleForm without issues", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <EditArticleForm></EditArticleForm>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  describe(`submits EditArticleForm`, () => {
    it("edits article", () => {
      const onSubmit = sinon.spy();
      const wrapper = mount(
        <BrowserRouter>
          <EditArticleForm onSubmit={onSubmit}></EditArticleForm>
        </BrowserRouter>
      );

      wrapper.find("form").simulate("submit", {
        target: {
          title: "Edited title",
          content: "Edited Content",
          article_tag: "News"
        },
        preventDefault: () => {}
      });
    });
  });
});
