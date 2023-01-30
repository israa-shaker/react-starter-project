type InitState = {
  draggale: boolean;
};
const initialState: InitState = {
  draggale: false
};
const bookItemReducer = (state = initialState, action: { type: string }) => {
  if (action.type === "DRAGGALE") {
    return { draggale: true };
  }
  if (action.type === "NOT_DRAGGALE") {
    return { draggale: false };
  }
  return state;
};

export default bookItemReducer;
