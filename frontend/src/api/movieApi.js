import axios from "axios";

const options = {
  method: "GET",
  url: `${import.meta.env.VITE_NOW_PLAYING}`,
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async () => {
  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log(error);
  }
};
