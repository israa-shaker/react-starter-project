import React from "react";
import Book from "../models/book";
import { update } from "../BooksAPI";
import { useDispatch } from "react-redux";
import { getAllooks } from "../App";
import { Link } from "react-router-dom";
import BookShelfs from "../models/bookShelfs";


const BookItem: React.FC<{ book: Book }> = props => {
  const dispatch = useDispatch();
  const updateBookShelfHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch({ type: "LOADING_DATA" });
    update(props.book, value)
      .then(() => {
        getAllooks()
          .then((books: BookShelfs) => {
            dispatch({ type: "GET_ALL_SUCCESS", payload: books });
          })
          .catch(() => {
            dispatch({ type: "GET_ALL_FAILED" });
          });
      })
      .catch(() => {
        dispatch({ type: "GET_ALL_FAILED" });
      });
  };
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${props.book.imageLinks?.thumbnail}")`
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={props.book.shelf ? props.book.shelf : 'no-value'} onChange={updateBookShelfHandler}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="no-value">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors}</div>
      <div className="book-detail">
        <Link to={`/book/${props.book.id}`}>More Info</Link>
      </div>
    </div>
  );
};
export default BookItem;
