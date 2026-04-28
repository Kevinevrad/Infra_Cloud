import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { theme } from "./styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
