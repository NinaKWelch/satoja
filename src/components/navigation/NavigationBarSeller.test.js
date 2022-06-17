import React from "react";
import NavigationBarSeller from "./NavigationBarSeller";
//import { Link } from "react-router-dom";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

//const requiredURLs = ["/", "/add", "/products", "/orders/seller", "/profile/seller"];

describe("Navigation bar for Seller", () => {
  const wrapper = mount(
    <BrowserRouter>
      <NavigationBarSeller />
    </BrowserRouter>
  );

  const links = wrapper.find("a");
  //const linkURLs = links.map((link) => link.props().to);

  test("contains 5 links", () => {
    expect(links.length).toBe(5);
  });

  /*
  test("contains links to all required URLs", () => {
    requiredURLs.forEach((url) => {
      expect(linkURLs).toContain(url);
    });
  });
  */
});
