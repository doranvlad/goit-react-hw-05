import s from "./MovieDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { fetchFromTmdbId } from "../../tmdbapi";
import { useState, useEffect } from "react";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [date, setDate] = useState("");
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const data = await fetchFromTmdbId(movieId);
        console.log(data.data);
        setMovie(data.data);
        setDate(` (${data.data.release_date.slice(0, 4)})`);
        setGenres(data.data.genres);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrends();
  }, [movieId]);

  return (
    <>
      {isLoading ? (
        <div className={s.loading}>Loading...</div>
      ) : (
        <div>
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
            <ul>
              {genres.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetailsPage;
