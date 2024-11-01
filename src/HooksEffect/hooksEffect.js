import { useState, useEffect, useRef } from "react";
import { PokemonsUrl } from "../constants/constants";

export const usePokemonList = (page, limit) => {
  const [pokemons, setPokemons] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page, limit]);

  return { pokemons, total, error, loading };
};

export const usePokemonData = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const forCall = useRef(false);

  useEffect(() => {
    if (forCall.current) return;
    forCall.current = true;

    console.log("Fetching Pokemon data for ID:", id);
    const fetchPokemon = async () => {
      setLoading(true);
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
    return () => {
      fetchPokemon();
    };
  }, [id]);
  return { pokemon, error, loading };
};
