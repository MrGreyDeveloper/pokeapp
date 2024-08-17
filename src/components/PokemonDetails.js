import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { usePokemonData } from "./HooksEffect";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#505050",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#2E2E2E",
          color: "#ffffff",
          border: "1px solid #424242",
          width: "60%",
          margin: "0 auto",
          padding: "16px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          color: "#ffffff",
        },
        h6: {
          color: "#ffffff",
        },
      },
    },
  },
});

function PokemonDetails() {
  const { id } = useParams();
  const { pokemon, error, loading } = usePokemonData(id);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          bgcolor="background.default"
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          bgcolor="background.default"
        >
          <Alert severity="error">{error}</Alert>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        sx={{ bgcolor: "background.default", minHeight: "100vh", py: 3 }}
      >
        {pokemon ? (
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ objectFit: "contain", width: "150px", margin: "0 auto" }}
            />
            <CardContent>
              <Typography variant="h4" align="center">
                {pokemon.name}
              </Typography>
              <Typography variant="body1">Height: {pokemon.height}</Typography>
              <Typography variant="body1">Weight: {pokemon.weight}</Typography>
              <Typography variant="h6">Stats</Typography>
              <List>
                {pokemon.stats.map((stat) => (
                  <ListItem key={stat.stat.name}>
                    <ListItemText
                      primary={`${stat.stat.name}: ${stat.base_stat}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6">Abilities</Typography>
              <List>
                {pokemon.abilities.map((ability) => (
                  <ListItem key={ability.ability.name}>
                    <ListItemText
                      primary={`${ability.ability.name} ${
                        ability.is_hidden ? "(Hidden)" : ""
                      }`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default PokemonDetails;
