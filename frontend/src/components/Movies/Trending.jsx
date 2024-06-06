import { Box, Heading, Grid, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/movieApi";
import MovieCard from "../MovieCard/MovieCard"; // Import the MovieCard component

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages

  const fetchTrending = async (pageNum) => {
    const response = await fetchTrendingMovies(pageNum);
    setTrendingMovies(response.data.results);
    setTotalPages(Math.min(response.data.total_pages, 20)); // Limit to a maximum of 20 pages
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    fetchTrending(page);
  }, [page]);

  return (
    <Box ml={5} mt={3} mb={10}>
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
      <Box mt={4} textAlign="center">
        <Text fontSize="lg" mb={2}>
          Page {page} of {totalPages}
        </Text>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={handlePrevPage}
          mr={2}
          disabled={page === 1}
        >
          Previous Page
        </Button>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={handleNextPage}
          ml={2}
          disabled={page === totalPages}
        >
          Next Page
        </Button>
      </Box>
    </Box>
  );
};

export default Trending;
