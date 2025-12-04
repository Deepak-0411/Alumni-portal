import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HistoryRouter } from "react-router-dom";
import history from "./utility/history.js";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </QueryClientProvider>
);
