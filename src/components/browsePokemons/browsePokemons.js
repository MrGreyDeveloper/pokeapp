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
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { usePokemonList } from "../../HooksEffect/hooksEffect";
import LanguageSwitcher from "../languageSwitcher/languageSwitcher";
import { useTranslation } from "react-i18next";
import "./browsePokemons.css";

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
  const { pokemons, total, error } = usePokemonList(page, limit);

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

  if (error) {
    return (
      <Container maxWidth={false} className="container">
        <Typography variant="h6" color="error">
          {t("ErrorMessage")}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} className="container">
      <LanguageSwitcher />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        className="header-box"
      >
        <Typography className="typography-h4">
          {t("ChooseYourPokemon")}
        </Typography>
        <FormControl variant="outlined" className="form-control">
          <Select
            value={limit}
            onChange={handleLimitChange}
            displayEmpty
            className="select"
          >
            <MenuItem value={5}>{t("itemPerPage", { count: 5 })}</MenuItem>
            <MenuItem value={10}>{t("itemPerPage", { count: 10 })}</MenuItem>
            <MenuItem value={50}>{t("itemPerPage", { count: 50 })}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={4} className="grid-container">
        {pokemons.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`} className="link">
              <Card className="card">
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.url.split("/")[pokemon.url.split("/").length - 2]
                  }.png`}
                  alt={pokemon.name}
                  className="card-media"
                />
                <CardContent>
                  <Typography className="typography-h6" align="center">
                    {pokemon.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={2} className="pagination">
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}

export default BrowsePokemons;