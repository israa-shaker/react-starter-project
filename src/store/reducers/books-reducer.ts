import BookShelfs from "../../models/bookShelfs";

type InitState = {
  bookShelfs: BookShelfs;
  loading: boolean;
  error: boolean;
};
const initialState: InitState = {
  bookShelfs: {} as BookShelfs,
  loading: false,
  error: false
};
const booksReducer = (
  state = initialState,
  action: { type: string; payload: BookShelfs }
) => {
  if (action.type === "LOADING_DATA") {
    return {
      ...state,
      loading: true,
      error: false
    };
  }
  if (action.type === "GET_ALL_SUCCESS") {
    return {
      ...state,
      bookShelfs: action.payload,
      loading: false
    };
  }
  if (action.type === "GET_ALL_FAILED") {
    return {
      ...state,
      error: true,
      loading: false
    };
  }
  return state;
};

export default booksReducer;
