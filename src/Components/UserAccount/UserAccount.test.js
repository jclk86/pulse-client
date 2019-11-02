import React from "react";
import { BrowserRouter } from "react-router-dom";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import UserAccount from "./UserAccount";
import AuthApiService from "../../Services/auth-api-service";
import { mockUser } from "../TestHelper/MockData";

describe("UserAccount Component", () => {
  beforeAll(() => {
    AuthApiService.postUser(mockUser).then(user => {
      AuthApiService.postLogin({
        username: user.username,
        password: user.password
      });
    });
  });

  it("renders UserAccount component without issues", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <UserAccount user={mockUser}></UserAccount>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
