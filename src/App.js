import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BrowsePokemons from "./components/BrowsePokemons";
import PokemonDetails from "./components/PokemonDetails";
import "bootstrap/dist/css/bootstrap.min.css";

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
