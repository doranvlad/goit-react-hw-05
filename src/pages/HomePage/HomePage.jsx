import s from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

function HomePage({ setTrends }) {
  return (
    <>
      <h1>Trending today</h1>
      <MovieList movieList={setTrends} />
    </>
  );
}

export default HomePage;
