import s from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { fetchFromTmdbSearch } from "../../tmdbapi";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams, useLocation } from "react-router-dom";

function MoviesPage() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchPar, setSearchPar] = useSearchParams();
  const queryParam = searchPar.get("query");
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { inputSearch } = form.elements;

    setSearch(inputSearch.value);

    form.reset();
  };

  useEffect(() => {
    if (!queryParam) {
      return;
    }

    async function fetchdata() {
      try {
        const data = await fetchFromTmdbSearch(queryParam);
        setMovies(data.data.results);
      } catch (error) {
        return;
      }
    }

    fetchdata();
  }, [queryParam]);

  useEffect(() => {
    if (!search) {
      return;
    }

    async function fetchdata() {
      try {
        const data = await fetchFromTmdbSearch(search);
        setSearchPar({ query: search });
        setMovies(data.data.results);
      } catch (error) {
        return;
      }
    }

    fetchdata();
  }, [search, setSearchPar]);
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search movie by name"
          name="inputSearch"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movieList={movies} />
    </>
  );
}

export default MoviesPage;
