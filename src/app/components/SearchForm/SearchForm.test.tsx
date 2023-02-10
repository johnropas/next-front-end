import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import searchReducer from "../../reducers/Search";
import SearchForm from "./SearchForm";
import { search } from "../../actions/Search";

const store = createStore(searchReducer, applyMiddleware(thunk));

describe("SearchForm component", () => {
  it("dispatches the search action when the form is submitted", async () => {
    const dispatch = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <SearchForm dispatch={dispatch} />
      </Provider>
    );

    const input = getByPlaceholderText("Search for an artist, album, or song");
    const button = getByText("Search");

    fireEvent.change(input, { target: { value: "Queen" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(search("Queen"));
    });
  });
});

describe("search thunk action", () => {
  it("dispatches success action when API call is successful", async () => {
    const dispatch = jest.fn();
    const apiCall = jest.fn().mockResolvedValue({
      data: [{ name: "Queen" }],
    });

    // @ts-ignore
    await search("Queen")(dispatch, () => {}, { apiCall });

    expect(dispatch).toHaveBeenCalledWith({
      type: "SEARCH_SUCCESS",
      payload: [{ name: "Queen" }],
    });
  });

  it("dispatches error action when API call fails", async () => {
    const dispatch = jest.fn();
    const apiCall = jest.fn().mockRejectedValue(new Error("Network Error"));

    // @ts-ignore
    await search("Queen")(dispatch, () => {}, { apiCall });

    expect(dispatch).toHaveBeenCalledWith({
      type: "SEARCH_FAILURE",
      payload: new Error("Network Error"),
    });
  });
});
