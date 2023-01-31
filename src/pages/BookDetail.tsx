import React from "react";
import Book from "../models/book";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "../BooksAPI";
import LoadingSpinner from "../components/loading/LoadingSpinner";

const BookDetail = () => {
  const [bookData, setBookData] = useState<Book>({} as Book);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const { bookId } = params as {bookId : string };

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    get(bookId)
      .then((data: Book) => {
        setBookData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  }, [bookId]);
  return (
    <div className="book book-detail-container">
      {isLoading && <LoadingSpinner />}
      {error && !isLoading && <p>No book data found</p>}
      {!error && !isLoading && bookData && (
        <div>
          <p>{bookData.shelf}</p>
          <p>
            {bookData.publishedDate
              ? `Published: ${bookData.publishedDate}`
              : ""}
          </p>
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${bookData.imageLinks?.thumbnail}")`
              }}
            ></div>
          </div>
          <div className="book-title">{bookData.title}</div>
          <div className="book-title">{bookData.subtitle}</div>
          <div className="book-authors">{bookData.authors}</div>
        </div>
      )}
    </div>
  );
};
export default BookDetail;
