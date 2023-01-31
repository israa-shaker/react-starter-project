import { renderWithContext } from "../test-utils";
import BookItem from "./BookItem";
import React from "react";
import { screen } from "@testing-library/react";

describe("BookItem", () => {
  const book = {
    title: "booktitle",
    subtitle: "s",
    id: "amk",
    shelf: "",
    authors: "",
    publishedDate: "",
    imageLinks: { thumbnail: "" }
  };
  test("renders ook data", () => {
    renderWithContext(<BookItem book={book} />);
    const bookTitleElement = screen.getByText("booktitle");
    expect(bookTitleElement).toBeInTheDocument();
  });

  test("render select option values for each ook", async () => {
    renderWithContext(<BookItem book={book} />);
    expect(screen.getByText("Want to Read")).toBeInTheDocument();
    expect(screen.getByText("Currently Reading")).toBeInTheDocument();
    expect(screen.getByText("Read")).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  test("should have link to detail page for each ook", () => {
    renderWithContext(<BookItem book={book} />);
    const bookTitleElement = screen.getByText("More Info");
    expect(bookTitleElement).toBeInTheDocument();
  });
});
