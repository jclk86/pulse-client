import React from "react";
import { BrowserRouter } from "react-router-dom";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import UserProfile from "./UserProfile";
import AuthApiService from "../../Services/auth-api-service";
import { mockUser } from "../TestHelper/MockData";

describe("UserProfile Component", () => {
  beforeAll(() => {
    AuthApiService.postUser(mockUser).then(user => {
      AuthApiService.postLogin({
        username: user.username,
        password: user.password
      });
    });
  });

  it("renders UserProfile component without issues", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <UserProfile user={mockUser}></UserProfile>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
