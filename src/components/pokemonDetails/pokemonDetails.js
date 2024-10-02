import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { usePokemonData } from "../../HooksEffect/hooksEffect";
import Loading from "../loading/loading.js";
import Error from "../error/error";
import "./pokemonDetails.css";

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
    <Container maxWidth={false} className="container">
      {pokemon && (
        <Card className="card">
          <img
            className="card-media"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            height="200"
          />
          <CardContent>
            <Typography className="typography-h4">{pokemon.name}</Typography>
            <Typography className="typography-body1">
              Height: {pokemon.height}
            </Typography>
            <Typography className="typography-body1">
              Weight: {pokemon.weight}
            </Typography>
            <Typography className="typography-h6">Stats</Typography>
            <List>
              {pokemon.stats.map((stat, index) => (
                <ListItem
                  key={`{stat.stat.name}-${index}`}
                  className="list-item"
                >
                  <ListItemText
                    primary={`${stat.stat.name}: ${stat.base_stat}`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography className="typography-h6">Abilities</Typography>
            <List>
              {pokemon.abilities.map((ability, index) => (
                <ListItem
                  key={`{ability.ability.name}-${index}`}
                  className="list-item"
                >
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
      )}
    </Container>
  );
}

export default PokemonDetails;
