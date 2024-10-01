import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BrowsePokemons from "./components/browsePokemons";
import PokemonDetails from "./components/pokemonDetails";
import "./i18n";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrowsePokemons />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
