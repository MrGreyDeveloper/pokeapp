import { useState, useEffect } from "react";
import { PokemonsUrl } from "./constants";

export const usePokemonData = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    //return () =>  {} ??
    fetchPokemon();
  }, [id]);
  return { pokemon, error, loading };
};
