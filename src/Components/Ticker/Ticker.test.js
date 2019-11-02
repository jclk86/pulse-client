import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Ticker from "./Ticker";
import NewsApiService from "../../Services/news-api-service";

describe(`Ticker Component`, () => {
  it("renders Ticker component without issues", () => {
    const news = NewsApiService.getNews().then(news => {
      return news;
    });

    const wrapper = shallow(<Ticker news={news}></Ticker>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
