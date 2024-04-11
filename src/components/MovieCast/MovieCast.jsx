import { useEffect, useState } from "react";
import s from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { fetchFromTmdbCast } from "../../tmdbapi";

function MovieCast() {
  const [castList, setCastList] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchCast() {
      try {
        const data = await fetchFromTmdbCast(movieId);
        setCastList(
          data.data.cast.filter((el) => {
            return el.profile_path !== null;
          })
        );
      } catch (error) {
        return;
      }
    }
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <ul className={s.list}>
        {castList.map((cast) => {
          return (
            <li key={cast.id} className={s.item}>
              <img
                className={s.img}
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={cast.name}
              />
              <p>{cast.name}</p>
              <p>Character: {cast.character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MovieCast;
