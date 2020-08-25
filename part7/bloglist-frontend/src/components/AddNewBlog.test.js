import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddNewBlog from "./AddNewBlog";

test("Filled new blog from calls submit new blog with the proper params", () => {
  const submitNewBlog = jest.fn();

  const sampleInputValue = "sampleValue";

  const component = render(<AddNewBlog submitNewBlog={submitNewBlog} />);

  const form = component.container.querySelector("form");
  const titleField = component.container.querySelector("#title");

  fireEvent.change(titleField, { target: { value: sampleInputValue } });
  fireEvent.submit(form);

  expect(submitNewBlog.mock.calls).toHaveLength(1);
  expect(submitNewBlog.mock.calls[0][0].title).toBe(sampleInputValue);
});
