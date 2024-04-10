import { Link } from "react-router-dom";
import s from "./MovieList.module.css";

function MovieList({ movieList }) {
  return (
    <ul>
      {movieList.map((movie) => {
        return (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieList;
