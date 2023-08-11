import { render, screen, cleanup } from "@testing-library/react";
import Navbar from "../Components/navbar/Navbar";

afterEach(cleanup);

test("navbar working properly", () => {
  render(<Navbar />);
  expect(screen.getByTestId("navbar")).toBeInTheDocument();
  const imgElement = screen.getByTestId("logo");
  const pElement = screen.getByTestId("title");
  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute("alt", "navbar-icon");
  expect(imgElement).toBeVisible();
  expect(imgElement).toHaveAttribute("src");
  expect(pElement).toBeInTheDocument();
  expect(pElement).toHaveTextContent("Weather Forecast");
  expect(pElement).toBeVisible();
});