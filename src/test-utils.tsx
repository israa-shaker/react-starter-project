import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter } from "react-router-dom";

//custom render that includes redux provider
export function renderWithContext(element: React.ReactElement) {
  const utils = render(
    <Provider store={store}>
      <BrowserRouter>{element}</BrowserRouter>
    </Provider>
  );
  return { store, ...utils };
}
