import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#06b6d4" },
    secondary: { main: "#8b5cf6" },
    background: {
      default: "#000000",
      paper: "#18181b",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
