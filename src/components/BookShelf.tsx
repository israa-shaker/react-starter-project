import React from "react";
import Book from "../models/book";
import BookItem from "./BookItem";
const BookShelf: React.FC<{ bookshelf: string; books: Book[] }> = props => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.bookshelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => (
            <li key={book.id}>
              <BookItem book={book} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default BookShelf;
