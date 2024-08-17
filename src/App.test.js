import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2D2D2D",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#E0E0E0",
    },
  },
});

function TestRender() {
  const pokemons = [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{ bgcolor: "background.default", minHeight: "100vh", py: 3 }}
      >
        <Typography variant="h4" align="center">
          Test Pokemon
        </Typography>
        <Grid container spacing={3}>
          {pokemons.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
              <Card sx={{ textDecoration: "none" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.url.split("/")[pokemon.url.split("/").length - 2]
                  }.png`}
                  alt={pokemon.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" align="center">
                    {pokemon.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default TestRender;
