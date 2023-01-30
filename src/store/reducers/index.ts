import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import booksReducer from "./books-reducer";
import bookItemReducer from "./book-item-reducer";

export default combineReducers({
  auth: authReducer,
  books: booksReducer,
  bookItem: bookItemReducer
});
