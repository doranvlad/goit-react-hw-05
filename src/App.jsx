import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Navigation from "./components/Navigation/Navigation";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import { useEffect } from "react";
import { fetchFromTmdbSearch, fetchFromTmdbTop } from "./tmdbapi";
import { useState } from "react";

function App() {
  const [trends, setTrends] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }
    async function fetchTrends() {
      try {
        const data = await fetchFromTmdbTop();
        setTrends(data.data.results);
      } catch (error) {
        return;
      }
    }

    fetchTrends();
  }, [location.pathname]);
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage setTrends={trends} />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
