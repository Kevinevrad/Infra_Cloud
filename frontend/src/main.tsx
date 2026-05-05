import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { theme } from "./styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Font Import
// import "@fontsource/poppins/100.css";
// import "@fontsource/poppins/300.css";
// import "@fontsource/poppins/400.css";
// import "@fontsource/poppins/700.css";
// import "@fontsource/poppins/900.css";

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
