type Book = {
  id: string;
  shelf: string;
  title: string;
  subtitle: string;
  authors: string;
  publishedDate: string;
  imageLinks: { thumbnail?: string };
  [key: string]: string | {} | [];
};
export default Book;
