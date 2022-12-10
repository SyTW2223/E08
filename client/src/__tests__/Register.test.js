import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "./test-utils";
import { userEvent } from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

import { Register } from "../components/Register";

beforeEach(() => {
  render(
    <Router>
      <Register />
    </Router>
  )
});

describe("SignUp component tests", () => {
  it("Must have an input for the username", () => {
    // const accountNameField = screen.getByLabelText(/account name/i);
    // expect(accountNameField).toBeEnabled();
  });

  it("Must have an input for the account name", () => {
    // const accountNameField = screen.getByLabelText(/account name/i);
    // expect(accountNameField).toBeEnabled();
  });

  it("Must have an input for the password", () => {
    // const accountNameField = screen.getByLabelText(/account name/i);
    // expect(accountNameField).toBeEnabled();
  });

  it("Must have an input for the password", () => {
    // const passwordField = screen.getByLabelText(/password/i);
    // expect(passwordField).toBeEnabled();
  });
});