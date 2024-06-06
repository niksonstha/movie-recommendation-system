import axios from "axios";

export const fetchMovies = async () => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_NOW_PLAYING}`,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTrendingMovies = async () => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_TRENDING_MOVIES}`,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGenres = async () => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_GENRE}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.genres; // Return the entire list of genres
  } catch (error) {
    console.log(error);
  }
};
export const popularMovies = async () => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_POPULAR}`,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
