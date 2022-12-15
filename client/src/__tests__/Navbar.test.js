import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../test-utils";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "../components/Navbar";

beforeEach(() => {
  render(
    <Router>
      <Navbar />
    </Router>
  )
});

describe("Navbar tests", () => {
  it("Must display the utopia name", () => {
    const title = screen.getByText(/utopia/i);

    expect(title).toBeInTheDocument();
  });

  it("Must display a button to login", () => {
    const button = screen.getByText(/login/i);

    expect(button).toBeEnabled();
    expect(button).toHaveTextContent(/login/i);
  });
});