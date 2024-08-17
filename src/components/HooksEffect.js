import { useState, useEffect } from "react";
import { PokemonsUrl } from "./constants";

export const usePokemonList = (page, limit) => {
  const [pokemons, setPokemons] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //Hook za dobijanje liste pokemona

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          `${PokemonsUrl}/pokemon?offset=${(page - 1) * limit}&limit=${limit}`
        );
        if (!response.ok) {
          throw new Error("Netwokr response is not ok");
        }
        const data = await response.json();
        setPokemons(data.results);
        setTotal(data.count);
      } catch (eror) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page, limit]);

  return { pokemons, total, error, loading };
};

//Hook za dobijanje podataka o pojedinacnom pokemonu

export const usePokemonData = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`${PokemonsUrl}/pokemon/${id}`);
        if (!response.ok) {
          throw new Error(" Network response wasn't ok");
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);
  return { pokemon, error, loading };
};
