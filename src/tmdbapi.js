import axios from "axios";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmM3NmYyN2RkNTVmOWZkZDkzNDQ3Y2YxM2Q1YjkzMCIsInN1YiI6IjY2MTY3YjIzYTM5ZDBiMDE0YTg5YzYxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WEkbI4nVcup0NC8aOV6r2APgxNbWlzWbeuR9hP1ssHQ",
  },
};

export const fetchFromTmdbSearch = (search = "") => {
  let q = "";
  if (search) {
    q = "query=" + search;
  }
  const respone = axios.get(
    `https://api.themoviedb.org/3/search/movie?${q}include_adult=false&language=en-US&page=1`,
    options
  );

  return respone;
};

export const fetchFromTmdbTop = () => {
  const respone = axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
    options
  );

  return respone;
};

export const fetchFromTmdbId = (id) => {
  const respone = axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );

  return respone;
};

export const fetchFromTmdbCast = (id) => {
  const respone = axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    options
  );

  return respone;
};
