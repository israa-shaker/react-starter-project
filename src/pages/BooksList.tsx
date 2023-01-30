import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BookShelfs from "../models/bookShelfs";
import BookShelf from "../components/BookShelf";
import { useSelector, useDispatch } from "react-redux";

const BooksList = () => {
  const bookShelfs = useSelector(
    (state: { books: { bookShelfs: BookShelfs } }) => state.books.bookShelfs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "DRAGGALE" });
    return () => {
      dispatch({ type: "NOT_DRAGGALE" });
    };
  }, [dispatch]);
  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          <ul>
            {Object.entries(bookShelfs).map(([key, val]) => (
              <BookShelf key={key} bookshelf={key} books={val} />
            ))}
          </ul>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};
export default BooksList;
