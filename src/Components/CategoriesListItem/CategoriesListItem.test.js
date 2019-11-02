import React from "react";
import { BrowserRouter } from "react-router-dom";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { categories } from "../TestHelper/MockData";
import CategoriesListItem from "./CategoriesListItem";

describe(`CategoriesListItem Component`, () => {
  it("renders CategoriesListItem component without issues", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <CategoriesListItem category={categories[0]}></CategoriesListItem>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
