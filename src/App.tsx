import "./App.css";
import React from "react";
import SearchPage from "./pages/SearchPage";
import BooksList from "./pages/BooksList";
import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Book from "./models/book";
import BookShelfs from "./models/bookShelfs";
import { getAll } from "./BooksAPI";
import { useSelector, useDispatch } from "react-redux";
import AuthForm from "./pages/auth/AuthForm";
import BookDetail from "./pages/BookDetail";
import LoadingSpinner from "./components/loading/LoadingSpinner";

export const getAllooks = () => {
  return getAll().then((data: Book[]) => {
    return groupBy(data, "shelf");
  });
};

const groupBy = (array: Book[], key: string) => {
  return array.reduce(
    (result: BookShelfs, currentValue: Book) => {
      const shelfKey = currentValue[key] as string;
      (result[shelfKey] = result[shelfKey] || []).push(currentValue);
      return result;
    },
    {} as BookShelfs
  );
};

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: { auth: { isLoggedIn: boolean } }) => state.auth.isLoggedIn
  );
  const isLoading = useSelector(
    (state: { books: { loading: boolean } }) => state.books.loading
  );
  const hasError = useSelector(
    (state: { books: { error: boolean } }) => state.books.error
  );
  useEffect(() => {
    dispatch({ type: "LOADING_DATA" });
    getAllooks()
      .then((books: BookShelfs) => {
        dispatch({ type: "GET_ALL_SUCCESS", payload: books });
      })
      .catch(() => {
        dispatch({ type: "GET_ALL_FAILED" });
      });
  }, [dispatch]);

  return (
    <div className="app">
      <MainHeader />
      <main>
        <Switch>
          {isLoggedIn && (
            <Route path="/" exact>
              {isLoading && <LoadingSpinner />}
              {!isLoading && !hasError && <BooksList />}
              {!isLoading && hasError && (
                <div className="books-error">
                  <p>An Error Occured...</p>
                </div>
              )}
            </Route>
          )}
          <Route path="/auth">
            {!isLoggedIn && <AuthForm />}
            {isLoggedIn && <Redirect to="/" />}
          </Route>
          {isLoggedIn && (
            <Route path="/book/:bookId">
              <BookDetail />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/search">
              <SearchPage />
            </Route>
          )}
          <Route path="*">
            <Redirect to="/auth" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
