import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./services/store/index.ts";
import { createTheme, ThemeProvider } from "@mui/material";
import { UpProvider } from "./services/providers/UPProvider.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Primary color
    },
    secondary: {
      main: "#de2f74", // Secondary color
      light: "#ff5c8d",
      dark: "#a22756",
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <UpProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
      </UpProvider>
    </Provider>
  </StrictMode>
);
