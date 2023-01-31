import { renderWithContext } from "../test-utils";

import BookShelf from "./BookShelf";
import React from "react";
import { screen } from "@testing-library/react";
describe("BookShelf", () => {
  const books = [
    {
      title: "t",
      subtitle: "s",
      id: "ak",
      shelf: "",
      authors: "",
      publishedDate: "",
      imageLinks: { thumbnail: "" }
    },
    {
      title: "t",
      subtitle: "s",
      id: "ag",
      shelf: "",
      authors: "",
      publishedDate: "",
      imageLinks: { thumbnail: "" }
    },
    {
      title: "t",
      subtitle: "s",
      id: "at",
      shelf: "",
      authors: "",
      publishedDate: "",
      imageLinks: { thumbnail: "" }
    }
  ];
  test("renders shelf name", () => {
    renderWithContext(<BookShelf bookshelf="currentlyReading" books={books} />);
    const shelfNameElement = screen.getByText("currentlyReading");
    expect(shelfNameElement).toBeInTheDocument();
  });

  test("renders BookItem component", () => {
    renderWithContext(<BookShelf bookshelf="currentlyReading" books={books} />);
    expect(screen.getAllByRole("listitem")).not.toHaveLength(0);
  });
});
