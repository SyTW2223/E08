import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../testUtils";
import { BrowserRouter as Router } from "react-router-dom";

import { Post } from "../components/posts/Post";

beforeEach(() => {
  render(
    <Router>
      <Post 
        id={'1'} 
        title={'Prueba'} 
        accountName={'Dani'}
        profilePicture={''}
        content={'una prueba'}
        likes={['Paco']}
        tags={['Gaming', 'Music']}
        date={'2023-01-20T22:47:46.532+00:00'}
      />
    </Router>
  )
});

describe("Post component test", () => {
  it("It should render the title", () => {
    expect(screen.getByText('Prueba')).toBeInTheDocument()
  });

  it("It should render the account", () => {
    expect(screen.getByText('Dani')).toBeInTheDocument()
  });

  it("It should render the content", () => {
    expect(screen.getByText('una prueba')).toBeInTheDocument()
  });

  it("It should render the tags", () => {
    expect(screen.getByText(/Tags: Gaming, Music/i)).toBeInTheDocument()
  });

  it("It should render the number of likes", () => {
    expect(screen.getByText(1)).toBeInTheDocument()
  });

  it("It should render the date", () => {
    expect(screen.getByText('22:47 | 2023-01-20')).toBeInTheDocument()
  });
});