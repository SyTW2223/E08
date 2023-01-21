import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "../testUtils";
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
  it("Must have the text Sign up", () => {
    const signupText = screen.getByText(/sign up/i);
    expect(signupText).toBeInTheDocument();
  });
  it("Must have an input for the username", () => {
    const userNameField = screen.getByLabelText(/username/i);
    expect(userNameField).toBeEnabled();
  });
  it("Must have an input for the account name", () => {
    const accountNameField = screen.getByLabelText(/account name/i);
    expect(accountNameField).toBeEnabled();
  });

  it("Must have an input for the email", () => {
    const emailField = screen.getByLabelText(/email/i);
    expect(emailField).toBeEnabled();
  });

  it("Must have an input for the password", () => {
    const passwordField = screen.getByLabelText(/password/i);
    expect(passwordField).toBeEnabled();
  });

  it("Must have a button with the text sign me up", () => {
    const buttonsign = screen.getByRole('button', {name: /sign me up/i});
    expect(buttonsign).toBeInTheDocument();
  });
});

describe("User Sign Up input test", () => {
  it("User Input is correctly controlled", async () => {
    const userNameField = screen.getByLabelText(/username/i);
    const accountNameField = screen.getByLabelText(/account name/i);
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);

    fireEvent.change(userNameField, {target: {value: 'pepe'}});
    fireEvent.change(accountNameField, {target: {value: 'pepe. '}});
    fireEvent.change(emailField, {target: {value: 'pepe@mail.es'}});
    fireEvent.change(passwordField, {target: {value: '12345678q'}});

    const buttonsign = screen.getByRole('button', {name: /sign me up/i});
    fireEvent.click(buttonsign);

    const accountError = screen.getByText(/The account name must have a length less than or equal to 20 and can only contain alphanumeric characters./i);

    expect(accountError).toBeInTheDocument();
  });
});