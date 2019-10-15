import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Header from "./Header";

describe(`Header Component`, () => {
  it("renders Header component without issues", () => {
    const wrapper = shallow(<Header></Header>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
