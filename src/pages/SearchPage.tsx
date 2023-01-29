import React, { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { search } from "../BooksAPI";
import BookItem from "../components/BookItem";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import BookShelfs from "../models/bookShelfs";
import { useSelector } from 'react-redux';
import Book from "../models/book";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [resultBooks, setResultBooks] = useState<Book[] | {error: string} | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const bookShelfs = useSelector(
    (state: { books: { bookShelfs: BookShelfs } }) => state.books.bookShelfs
  );
  const checkBookShelf = useCallback((data: Book[]) => {
    let tranformedData: Book[] = [];
    let stop = false;
    if (data && data?.length > 0) {
    for (let i = 0; i< data.length; i++) {
    for (let property in bookShelfs) {
      if (!stop) {
      for (let j = 0; j< bookShelfs[property].length; j++) {
            if (bookShelfs[property][j].id === data[i].id) {
              const element = {...data[i], shelf: bookShelfs[property][j].shelf };
              tranformedData.push(element)
                stop = true ;
                break;
            }
          }
         }
        }
        const index = tranformedData.findIndex(el => el.id === data[i].id);
        if (index === -1) {
          tranformedData.push(data[i]);
        }
        stop = false;
      }
      return tranformedData;
    }
  }, [bookShelfs]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue === searchInputRef.current?.value) {
        if (!searchValue) {
          setResultBooks([]);
          return;
          }
          setIsLoading(true);
          setError(false);
          search(searchValue).then((data: Book[] | {error: string}) => {
            setIsLoading(false);
            if (data?.error) {
              setResultBooks({error: data?.error});
            } else {
              const results = data as Book[];
              const tranformedResults = checkBookShelf(results);
              setResultBooks(tranformedResults);
            }
          }).catch(() => {
            setIsLoading(false);
            setError(true);
          });
      }
    }, 500);
    return () => { 
      clearTimeout(timer);
    }
  }, [searchValue, searchInputRef, checkBookShelf]);

  const searchInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target?.value);
  };
  return (
    <div className="search-books">
    {isLoading && <LoadingSpinner />}
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search by title, author, or ISBN"
            onChange={searchInputChangeHandler}
          />
        </div>
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && <p className="search-books-results-error">No books data found</p>}
      {!isLoading && !error && resultBooks && resultBooks?.error && <p className="search-books-results-error">No books data found</p>}
      {!isLoading && !error && resultBooks?.length > 0 && (<div className="search-books-results">
        <ol className="books-grid">
        {resultBooks?.map((book: Book) => (
        <li key={book.id}>
          <BookItem key={book.id} book={book} />
        </li>
        ))}
        </ol>
      </div>)}
    </div>
  );
};
export default SearchPage;
