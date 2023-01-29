import Book from "./book";

type BookShelfs = {
  currentlyReading: Book[];
  wantToRead: Book[];
  read: Book[];
  [key: string]: Book[];
};
export default BookShelfs;
