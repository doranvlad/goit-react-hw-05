import s from "./MovieDetailsPage.module.css";
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { fetchFromTmdbId } from "../../tmdbapi";
import { useState, useEffect, useRef } from "react";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [date, setDate] = useState("");
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const goBackRef = useRef(location);

  useEffect(() => {
    console.log(location);
    console.log(goBackRef.current.state);
  }, []);
  useEffect(() => {
    async function fetchTrends() {
      try {
        const data = await fetchFromTmdbId(movieId);
        setMovie(data.data);
        setDate(` (${data.data.release_date.slice(0, 4)})`);
        setGenres(data.data.genres);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        return;
      }
    }

    fetchTrends();
  }, [movieId]);

  return (
    <>
      {isLoading ? (
        <div className={s.loading}>Loading...</div>
      ) : (
        <>
          <Link
            to={goBackRef.current.state ? goBackRef.current.state.from : "/"}
          >
            Back
          </Link>
          <div className={s.detail}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h1>
                {movie.title}
                {date}
              </h1>
              <p>{`User Score: ${Math.round(movie.vote_average * 10)}%`}</p>
              <h2>Overview</h2>
              <p>{`${movie.overview}`}</p>
              <h3>Genres</h3>
              <ul className={s.genres}>
                {genres.map((item) => {
                  return <li key={item.id}>{item.name}</li>;
                })}
              </ul>
            </div>
          </div>

          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
