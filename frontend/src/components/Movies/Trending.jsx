import { Box, Heading, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/movieApi";
import MovieCard from "../MovieCard/MovieCard"; // Import the MovieCard component

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  const getTrendingMovies = async () => {
    const response = await fetchTrendingMovies();
    setTrendingMovies(response.data.results);
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

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
          <MovieCard key={index} movie={movie} />
        ))}
      </Grid>
    </Box>
  );
};

export default Trending;
