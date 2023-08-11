import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("renders app", async () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(container).toBeInTheDocument());
});