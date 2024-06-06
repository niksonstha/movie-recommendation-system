import { useEffect, useState } from "react";
import { Box, Grid, Heading } from "@chakra-ui/react";
import { upcomingMovies } from "../../api/movieApi";
import MovieCard from "../MovieCard/MovieCard";

const UpcomingMovies = () => {
  const [upcoming, setUpcoming] = useState([]);

  const getUpcomingMovies = async () => {
    const response = await upcomingMovies();
    setUpcoming(response);
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  return (
    <Box ml={5} mt={3}>
      <Heading letterSpacing={4} mb={5}>
        Popular Movies
      </Heading>
      <Grid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={4}
        justifyContent="space-around"
      >
        {upcoming.map((movie, index) => (
          <Box key={index}>
            <MovieCard key={index} movie={movie} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingMovies;
