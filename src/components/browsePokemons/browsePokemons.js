import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { Grid } from "@mui/material";
import {
  StyledContainer,
  StyledGrid,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
  StyledBox,
} from "./muiStyles";
import { usePokemonList } from "../../HooksEffect/hooksEffect";
import LanguageSwitcher from "../languageSwitcher/languageSwitcher";
import PokemonHeader from "../PokemonHeader/pokemonHeader";
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
  const [searchTerm, setSearchTerm] = useState("");
  const { pokemons, total, error } = usePokemonList(page, limit);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    navigate(`?page=${page}&perPage=${limit}`);
  }, [page, limit, navigate]);

  if (error) {
    return (
      <StyledContainer>
        <StyledTypography variant="h6" color="error">
          {t("ErrorMessage")}
        </StyledTypography>
      </StyledContainer>
    );
  }

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <StyledContainer className="background-theme">
      <LanguageSwitcher />
      <PokemonHeader
        limit={limit}
        onLimitChange={handleLimitChange}
        onSearchChange={handleSearchChange}
      />
      <StyledGrid container spacing={2}>
        {" "}
        {filteredPokemons.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`} className="link">
              <StyledCard>
                <StyledCardMedia
                  component="img"
                  height="140"
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.url.split("/")[pokemon.url.split("/").length - 2]
                  }.png`}
                  alt={pokemon.name}
                />
                <StyledCardContent>
                  <StyledTypography>{pokemon.name}</StyledTypography>
                </StyledCardContent>
              </StyledCard>
            </Link>
          </Grid>
        ))}
      </StyledGrid>
      <StyledBox>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </StyledBox>
    </StyledContainer>
  );
}

export default BrowsePokemons;
