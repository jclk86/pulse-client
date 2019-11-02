import React from "react";
import { BrowserRouter } from "react-router-dom";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { categories } from "../TestHelper/MockData";
import CategoriesList from "./CategoriesList";

describe(`CategoriesList Component`, () => {
  it("renders CategoriesList component without issues", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <CategoriesList categories={categories}></CategoriesList>
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
