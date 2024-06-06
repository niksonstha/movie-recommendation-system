import { useEffect, useState } from "react";
import { Box, Grid, Heading } from "@chakra-ui/react";
import { upcomingMovies } from "../../api/movieApi";
import MovieCard from "../MovieCard/MovieCard";

const UpcomingMovies = () => {
  const [upcoming, setUpcoming] = useState([]);

  const getUpcomingMovies = async () => {
    const response = await upcomingMovies();
    // Filter movies based on release date
    const filteredMovies = response.filter(
      (movie) => new Date(movie.release_date) > new Date()
    );
    setUpcoming(filteredMovies);
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  return (
    <Box ml={5} mt={3}>
      <Heading letterSpacing={4} mb={5}>
        Upcoming Movies
      </Heading>
      <Grid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={4}
        justifyContent="space-around"
      >
        {upcoming.map((movie, index) => (
          <Box key={index}>
            <MovieCard movie={movie} isSliding={true} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingMovies;
