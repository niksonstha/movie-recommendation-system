import { Box, Image, Text, Spinner, Center, Badge } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieDetail } from "../../api/movieApi";

const MovieDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("movieId");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovieDetails = async () => {
    try {
      const response = await movieDetail(movieId);
      setMovie(response); // Ensure you set the state with response.data
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch movie details", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!movie) {
    return <Text>Movie not found</Text>;
  }

  return (
    <Box display={"flex"} flexDir={"column"} pos={"relative"} height={"150vh"}>
      <Box pos={"relative"} mb={4}>
        <Image
          src={`${import.meta.env.VITE_IMAGE_PATH}/${movie.backdrop_path}`}
          alt={movie.title}
          width={"100%"}
          height={"80vh"}
          objectFit={"cover"}
        />
        <Box
          pos={"absolute"}
          bottom={0}
          width={"100%"}
          height={"50%"}
          background={
            "linear-gradient(180deg, rgba(28,35,33,0) 20%, rgba(28,35,33,1) 90%)"
          }
          zIndex={1}
        />
      </Box>

      <Box display={"flex"} pos={"absolute"} top={400} zIndex={20} ml={10}>
        <Image
          src={`${import.meta.env.VITE_IMAGE_PATH}/${movie.poster_path}`}
          alt={movie.title}
          mb={4}
          borderRadius="md"
          width={"40%"}
          height={"80vh"}
          objectFit={"cover"}
        />
        <Box ml={5}>
          <Text fontSize="3xl" fontWeight="bold">
            {movie.title}
          </Text>
          <Text fontSize="lg" mt={2} textAlign={"justify"} width={"80%"}>
            {movie.overview}
          </Text>
          <Text fontSize="md" mt={2} color="gray.500">
            Release date: {movie.release_date}
          </Text>
          <Text fontSize="md" mt={2} color="gray.500">
            Runtime: {movie.runtime} minutes
          </Text>
          <Text fontSize="md" mt={2} color="gray.500">
            Genres: {movie.genres.map((genre) => genre.name).join(", ")}
          </Text>
          <Text fontSize="md" mt={2} color="gray.500">
            Tagline: {movie.tagline}
          </Text>
          <Badge fontSize="md" mt={2} colorScheme="green">
            Vote Average: {movie.vote_average}
          </Badge>
          <Text fontSize="md" mt={2} color="gray.500">
            Vote Count: {movie.vote_count}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetails;
