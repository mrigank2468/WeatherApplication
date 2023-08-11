import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Home from "../Components/home/Home";


afterEach(cleanup);

test("Homepage renders successfully", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(screen.getByTestId("home")).toBeInTheDocument();
});


test("testing search bar", async () => {
  render(
    <Provider store={store}>
      <Home/>
    </Provider>
  );
  const user = userEvent.setup();
  const searchBar = screen.getByTestId("search-bar");
  const searchBtn = screen.getByTestId("search-btn");
  expect(searchBar).toBeInTheDocument();
  expect(searchBar).toHaveAttribute("autoComplete", "off");
  expect(searchBar).toHaveAttribute("value");
  expect(searchBar).toHaveAttribute("type", "text");
  expect(searchBar).toHaveClass("input");
  expect(searchBtn).toBeInTheDocument();
  expect(searchBtn).toHaveClass("search_button");
  await user.type(searchBar, "Goa");
})