import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

function BrowsePokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${
        (page - 1) * limit
      }&limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data.results);
        setTotal(data.count);
      });
  }, [page, limit]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
  };

  return (
    <div>
      <div>
        <label>
          Items per page:
          <select value={limit} onChange={handleLimitChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
      <Pagination
        count={Math.ceil(total / limit)}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default BrowsePokemons;
