import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import sinon from "sinon";
import toJson from "enzyme-to-json";
import AuthApiService from "../../Services/auth-api-service";
import { mockUser } from "../TestHelper/MockData";
import EditUserForm from "./EditUserForm";

describe(`EditUserForm Component`, () => {
  beforeAll(() => {
    AuthApiService.postUser(mockUser).then(user => {
      AuthApiService.postLogin({
        username: user.username,
        password: user.password
      });
    });
  });

  it("renders EditUserForm without issues", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <EditUserForm></EditUserForm>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe(`submits EditUserForm`, () => {
    it("edits user", () => {
      const onSubmit = sinon.spy();
      const wrapper = mount(
        <BrowserRouter>
          <EditUserForm onSubmit={onSubmit}></EditUserForm>
        </BrowserRouter>
      );

      wrapper.find("form").simulate("submit", {
        target: {
          password: "Password321!",
          image_url:
            "https://images.pexels.com/photos/1694980/pexels-photo-1694980.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          profile: "test profile"
        },
        preventDefault: () => {}
      });
    });
  });
});
