import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#82b93f",
      light: "#81b477",
      dark: "#579c49",
    },
    secondary: {
      main: "#007a7d",
      light: "#046072",
      dark: "#2f4858",
    },
    warning: {
      main: "#FF9800",
    },
    background: {
      default: "#F5F5F5", // Fond de page légèrement grisé pour le confort
      paper: "#ffffff", // Fond des cartes et menus
    },
    text: {
      primary: "#212121", // Texte principal très lisible
      secondary: "#616161",
    },
  },

  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      fontSize: "3.5rem",
      lineHeight: 1.167,
      letterSpacing: "-0.04562em",
    },

    h2: {
      fontWeight: 900,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "-0.04562em",
    },
  },
});
