import React from "react";
import { useParams } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";
import { usePokemonData } from "../../HooksEffect/hooksEffect.js";
import Loading from "../loading/loading.js";
import Error from "../error/error.js";
import {
  StyledContainer,
  StyledCard,
  StyledCardContent,
  StyledTypography,
} from "./pokemonDetailsStyles";

function PokemonDetails() {
  const { id } = useParams();
  const { pokemon, loading, error } = usePokemonData(id);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <StyledContainer>
      {pokemon && (
        <StyledCard>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ height: "200px", width: "auto", borderRadius: "16px" }}
          />
          <StyledCardContent>
            <StyledTypography variant="h4">{pokemon.name}</StyledTypography>
            <StyledTypography variant="body1">
              Height: {pokemon.height}
            </StyledTypography>
            <StyledTypography variant="body1">
              Weight: {pokemon.weight}
            </StyledTypography>
            <StyledTypography variant="h6">Stats</StyledTypography>
            <List>
              {pokemon.stats.map((stat, index) => (
                <ListItem key={`${stat.stat.name}-${index}`}>
                  <ListItemText
                    primary={`${stat.stat.name}: ${stat.base_stat}`}
                  />
                </ListItem>
              ))}
            </List>
            <StyledTypography variant="h6">Abilities</StyledTypography>
            <List>
              {pokemon.abilities.map((ability, index) => (
                <ListItem key={`${ability.ability.name}-${index}`}>
                  <ListItemText
                    primary={`${ability.ability.name} ${
                      ability.is_hidden ? "(Hidden)" : ""
                    }`}
                  />
                </ListItem>
              ))}
            </List>
          </StyledCardContent>
        </StyledCard>
      )}
    </StyledContainer>
  );
}

export default PokemonDetails;
