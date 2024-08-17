import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {
  Container,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { usePokemonList } from "./HooksEffect";
import LanguageSwitcher from "./languageSwitcher";
import { useTranslation } from "react-i18next";

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
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#333333",
          color: "#ffffff",
          border: "1px solid #444444",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          padding: "16px",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.08)",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          color: "#E0E0E0",
          fontSize: "2rem",
        },
        h6: {
          color: "#ffffff",
          fontSize: "1.2rem",
        },
      },
    },
  },
});

function BrowsePokemons() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  const queryParams = getQueryParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialLimit = parseInt(queryParams.get("perPage")) || 10;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const { pokemons, total, error, loading } = usePokemonList(page, limit);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
  };

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    navigate(`?page=${page}&perPage=${limit}`);
  }, [page, limit, navigate]);

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
        <LanguageSwitcher />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          sx={{ pr: 6 }}
        >
          <Typography variant="h4" align="center">
            {t("ChooseYourPokemon")}
          </Typography>
          <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2 }}>
            <Select
              value={limit}
              onChange={handleLimitChange}
              displayEmpty
              sx={{ color: "white" }}
            >
              <MenuItem value={5}>{t("5perPage")}</MenuItem>
              <MenuItem value={10}>{t("10perPage")}</MenuItem>
              <MenuItem value={50}>{t("50perPage")}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={4}>
          {" "}
          {pokemons.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
              <Card
                component={Link}
                to={`/pokemon/${pokemon.name}`}
                sx={{ textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.url.split("/")[pokemon.url.split("/").length - 2]
                  }.png`}
                  alt={pokemon.name}
                  style={{ objectFit: "contain" }}
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
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(total / limit)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default BrowsePokemons;
