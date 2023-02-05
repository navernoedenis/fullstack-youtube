import React from "react";
import ReactDOM from "react-dom/client";
import { AxiosError } from "axios";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster, toast } from "react-hot-toast";

import { AuthProvider, SettingsProvider } from "context";
import { getAxiosErrorMessage } from "helpers/axios";
import { ThemeProvider } from "app/theme";

import App from "./app";
import "./i18n/config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.log("QUERY ERROR: ", error);

        toast.error(getAxiosErrorMessage(error as AxiosError));
      },
    },
    mutations: {
      onError: (error) => {
        console.log("MUTATION ERROR: ", error);

        toast.error(getAxiosErrorMessage(error as AxiosError));
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
          <Toaster position="top-center" />
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
