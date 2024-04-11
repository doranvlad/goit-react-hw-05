import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

function MovieList({ movieList }) {
  const location = useLocation();

  return (
    <ul>
      {movieList.map((movie) => {
        return (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieList;
