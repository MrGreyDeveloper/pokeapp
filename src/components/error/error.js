import React from "react";
import { Box, Alert } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2D2D2D",
    },
  },
});

function Error({ message }) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <Alert severity="error">{message}</Alert>
      </Box>
    </ThemeProvider>
  );
}

export default Error;
