import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const sampleBlog = {
  title: "title",
  author: "author",
  likes: 0,
  url: "http://blog.com",
};

test("blog overview gets rendered, but details does not", () => {
  const component = render(<Blog blog={sampleBlog} />);

  const div = component.container.querySelector(".blog")

  expect(div).toHaveTextContent("title by author");
  expect(div).not.toHaveTextContent("blog.com");
});

test("blog details rendered if details button clicked", () => {
  const component = render(<Blog blog={sampleBlog} />);

  const showHideButton = component.getByText("show");
  fireEvent.click(showHideButton);

  expect(component.container).toHaveTextContent("likes: 0");
  expect(showHideButton).toHaveTextContent("hide");
});

test("Like button calls the appropriate handler", () => {
  const mockLikeFunc = jest.fn();

  const component = render(<Blog blog={sampleBlog} handleLikeClicked={mockLikeFunc} />);

  const showHideButton = component.getByText("show");
  fireEvent.click(showHideButton);

  const likeButton = component.getByText("like");
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockLikeFunc.mock.calls).toHaveLength(2)
});


