import { useEffect, useState } from "react";
import s from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { fetchFromTmdbRev } from "../../tmdbapi";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await fetchFromTmdbRev(movieId);
        setReviews(data.data.results);
      } catch (error) {
        return;
      }
    }
    fetchReviews();
  }, [movieId]);
  return (
    <ul className={s.list}>
      {reviews.map((review) => {
        return (
          <li key={review.id}>
            <p className={s.author}>Author: {review.author}</p>
            <p className={s.content}>{review.content}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieReviews;
