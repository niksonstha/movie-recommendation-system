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

export const fetchTrendingMovies = async (page) => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_TRENDING_MOVIES}`,
    params: { language: "en-US", page },
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
export const topRated = async () => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_TOP_RATED}`,
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
export const upcomingMovies = async () => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_UPCOMING}`,
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
export const searchMovies = async (query) => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_SEARCH_MOVIE}`,
    params: {
      query,
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
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
export const movieDetail = async (id, recommendation) => {
  let url, params;
  if (recommendation) {
    url = `${import.meta.env.VITE_MOVIE_DETAIL}${id}/recommendations`;
    params = { language: "en-US", page: "1" };
  } else {
    url = `${import.meta.env.VITE_MOVIE_DETAIL}${id}`;
    params = { language: "en-US" };
  }

  const options = {
    method: "GET",
    url,
    params,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
    },
  };

  try {
    const response = await axios.request(options);
    return recommendation ? response.data.results : response.data;
  } catch (error) {
    console.log(error);
  }
};
