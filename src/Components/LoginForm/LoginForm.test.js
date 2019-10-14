import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LoginForm from "./LoginForm";
import sinon from "sinon";
import AuthApiService from "../../Services/auth-api-service";
import { mockUser } from "../TestHelper/MockData";

describe(`LoginForm Component`, () => {
  beforeAll(() => {
    AuthApiService.postUser(mockUser).then(user => {
      AuthApiService.postLogin({
        username: user.username,
        password: user.password
      });
    });
  });

  it("renders LoginForm without issue", () => {
    const wrapper = shallow(<LoginForm></LoginForm>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("submits login form", () => {
    const onSubmit = sinon.spy();
    const wrapper = mount(
      <BrowserRouter>
        <LoginForm onSubmit={onSubmit}></LoginForm>
      </BrowserRouter>
    );
    wrapper.find("Form").simulate("submit", {
      target: { username: mockUser.username, password: mockUser.password },
      preventDefault: () => {}
    });
  });
});
