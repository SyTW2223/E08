import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../testUtils";
import { BrowserRouter as Router } from "react-router-dom";

import { Login } from "../components/Login";

beforeEach(() => {
  render(
    <Router>
      <Login />
    </Router>
  )
});

describe("Login component tests", () => {
  it("Must have the text login", () => {
    const loginText = screen.getByRole('heading', {level: 4});
    expect(loginText).toBeInTheDocument();
  });
  it("Must have an input for the account name", () => {
    const accountNameField = screen.getByLabelText(/account name/i);
    expect(accountNameField).toBeEnabled();
  });
  it("Must have an input for the password", () => {
    const passwordField = screen.getByLabelText(/password/i);
    expect(passwordField).toBeEnabled();
  });
  it("Must have a button with the text login", () => {
    const buttonlogin = screen.getByRole('button', {name: /login/i});
    expect(buttonlogin).toBeInTheDocument();
  });
  it("Must have the text Don't have an account?", () => {
    const signupText = screen.getByText(/Don't have an account?/i);
    expect(signupText).toBeInTheDocument();
  });
  it("Must have a button with the sign up now", () => {
    const buttonsign = screen.getByRole('link', {name: /Sign Up Now/i});
    expect(buttonsign).toBeInTheDocument();
  });
});