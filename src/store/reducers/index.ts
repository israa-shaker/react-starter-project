import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import booksReducer from "./books-reducer";

export default combineReducers({
  auth: authReducer,
  books: booksReducer
});
