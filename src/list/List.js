import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import ListSummary from "./ListSummary";
import "./list.css";

export default function List({ setViewId }) {
  const [pokemonList, setPokemonList] = useState();
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getPokemons = useCallback(
    async (searchQuery) => {
      if (!searchQuery.length) {
        try {
          const { data } = await axios.get("http://localhost:3001/pokemon");
          setPokemonList(data);
          setIsError(false);
        } catch (err) {
          console.log(err.response.data);
          setIsError(err.response.data);
        }
      } else {
        try {
          const { data } = await axios.get(
            `https://serene-gorge-52427.herokuapp.com/pokemon/search/${searchQuery}`
          );
          setPokemonList(data);
          setIsError(false);
        } catch (err) {
          console.log(err.response.data);
          setIsError(err.response.data);
        }
      }
    },
    [searchQuery]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    getPokemons(searchQuery);
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getPokemons(searchQuery);
  }, [getPokemons, searchQuery]);

  return (
    <div>
      <form class="d-flex m-3" onSubmit={handleSearch}>
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search "
          name="searchQueryInput"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
        <button class="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div class="gridList">
        {/* {isError && }  */}
        {!isError &&
          pokemonList &&
          pokemonList.map((pokemon) => {
            return (
              <ListSummary
                pokemon={pokemon}
                setViewId={setViewId}
                key={pokemon.id}
              >
                {pokemon.name.english}
              </ListSummary>
            );
          })}
      </div>
    </div>
  );
}
