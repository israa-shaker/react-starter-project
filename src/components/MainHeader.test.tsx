import { renderWithContext } from "../test-utils";
import React from "react";
import MainHeader from "./MainHeader";
import { screen } from "@testing-library/react";

describe("MainHeader component", () => {
  test("render login component when not logged in", () => {
    renderWithContext(<MainHeader />);
    const loginElement = screen.getByText("Login");
    expect(loginElement).toBeInTheDocument();
  });
});
