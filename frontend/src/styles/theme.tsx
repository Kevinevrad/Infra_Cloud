import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#82B93F",
    },
    secondary: {
      main: "#4A4A4A",
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

  spacing: (factor) => `${0.5 * factor}rem`, // Espacement basé sur une unité de 0.5rem

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    h1: {
      fontWeight: 900,
      fontSize: "4rem",
      color: "#4A4A4A", // Titres en gris foncé pour la rigueur
    },
  },
});
