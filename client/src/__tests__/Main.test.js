import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../testUtils";
import { BrowserRouter as Router } from "react-router-dom";

import { Main } from "../components/Main";

beforeEach(() => {
  render(
    <Router>
      <Main />
    </Router>
  )
});

describe("Main component tests", () => {
  it("A user cannot post if not logged in", () => {
    const postText = screen.queryByText(/Please login to post/i);
    const titleField = screen.queryByLabelText(/title/i);
    const contentField = screen.queryByLabelText(/content/i);
    const tagsField = screen.queryByLabelText(/tag/i);

    expect(titleField).not.toBeInTheDocument();
    expect(contentField).not.toBeInTheDocument();
    expect(tagsField).not.toBeInTheDocument();
    expect(postText).toBeInTheDocument();
  });

  it("There is a region for recent posts", () => {
    expect(screen.getByText('Recent Posts')).toBeInTheDocument();
  });

  it("Indicates if there are no post", () => {
    expect(screen.getByText('No posts found')).toBeInTheDocument();
  });
});
