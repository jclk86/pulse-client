import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RegistrationForm from "./RegistrationForm";
import sinon from "sinon";
import { mockUser } from "../TestHelper/MockData";

describe("Registration Form Component", () => {
  it("renders registration form without issues", () => {
    const wrapper = shallow(<RegistrationForm></RegistrationForm>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("fires submit", () => {
    const onSubmit = sinon.spy();
    const wrapper = mount(
      <BrowserRouter>
        <RegistrationForm onSubmit={onSubmit}></RegistrationForm>
      </BrowserRouter>
    );
    wrapper.find("Form").simulate("submit", {
      target: {
        username: mockUser.username,
        password: mockUser.password,
        fullname: mockUser.fullname,
        email: mockUser.email,
        profile: mockUser.profile,
        image_url: mockUser.image_url
      },
      preventDefault: () => {}
    });
  });
});
