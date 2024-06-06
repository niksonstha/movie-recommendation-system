import { Box, Heading, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrendingMovies, fetchGenres } from "../api/movieApi";
import MovieCard from "./MovieCard"; // Import the MovieCard component

// Language code to full name mapping
const languageMap = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  // Add more language mappings as needed
};

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const getTrendingMovies = async () => {
    const response = await fetchTrendingMovies();
    setTrendingMovies(response.data.results);
  };

  const getGenres = async () => {
    const genres = await fetchGenres();
    setGenres(genres);
  };

  useEffect(() => {
    getTrendingMovies();
    getGenres();
  }, []);

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : "Unknown";
      })
      .join(", ");
  };

  const getLanguageName = (code) => {
    return languageMap[code] || code;
  };

  return (
    <Box ml={5} mt={3}>
      <Heading letterSpacing={4} mb={5}>
        Trending Movies
      </Heading>
      <Grid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={4}
        justifyContent="space-around"
      >
        {trendingMovies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            getGenreNames={getGenreNames}
            getLanguageName={getLanguageName}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Trending;
