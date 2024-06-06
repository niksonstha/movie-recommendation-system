import { Box, Image, Text, Spinner, Center, Badge } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGenres, movieDetail } from "../../api/movieApi";

const MovieDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("movieId");

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);

  const getGenres = async () => {
    const genresResponse = await fetchGenres();
    setGenres(genresResponse);
    setLoading(false); // Set loading to false after fetching data
  };

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : "Unknown";
      })
      .join(", ");
  };

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

  const getRecommendation = async () => {
    try {
      const response = await movieDetail(movieId, true);
      setRecommendations(response);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch recommendations", error);
    }
  };

  useEffect(() => {
    getMovieDetails();
    getRecommendation();
    getGenres();
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
    <>
      <Box
        display="flex"
        flexDirection="column"
        position="relative"
        height="130vh"
      >
        <Box position="relative" marginBottom={4}>
          <Image
            src={`${import.meta.env.VITE_IMAGE_PATH}/${movie.backdrop_path}`}
            alt={movie.title}
            width="100%"
            height="80vh"
            objectFit="cover"
          />
          <Box
            position="absolute"
            bottom={0}
            width="100%"
            height="50%"
            background="linear-gradient(180deg, rgba(28,35,33,0) 20%, rgba(28,35,33,1) 90%)"
            zIndex={1}
          />
        </Box>

        <Box
          display="flex"
          position="absolute"
          top={400}
          zIndex={20}
          marginLeft={10}
        >
          <Image
            src={`${import.meta.env.VITE_IMAGE_PATH}/${movie.poster_path}`}
            alt={movie.title}
            marginBottom={4}
            borderRadius="md"
            width="40%"
            height="80vh"
            objectFit="cover"
          />
          <Box marginLeft={5} width="50%">
            <Text fontSize="3xl" fontWeight="bold">
              {movie.title}
            </Text>
            <Text fontSize="md" marginTop={2} textAlign="justify">
              {movie.overview}
            </Text>
            <Text fontSize="md" marginTop={2} color="gray.500">
              Release date: {movie.release_date}
            </Text>
            <Text fontSize="md" marginTop={2} color="gray.500">
              Runtime: {movie.runtime} minutes
            </Text>
            <Text fontSize="md" marginTop={2} color="gray.500">
              Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </Text>
            <Text fontSize="md" marginTop={2} color="gray.500">
              Tagline: {movie.tagline}
            </Text>
            <Badge fontSize="md" marginTop={2} colorScheme="green">
              Vote Average: {movie.vote_average}
            </Badge>
            <Text fontSize="md" marginTop={2} color="gray.500">
              Vote Count: {movie.vote_count}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box mt={70}>
        <Text fontSize="3xl" fontWeight="bold" marginBottom={3}>
          Recommendations
        </Text>
        {recommendations.length > 0 && (
          <Box padding={5}>
            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
              {recommendations.slice(0, 8).map((recommendation) => (
                <Box
                  key={recommendation.id}
                  marginRight={4}
                  display={"flex"}
                  gap={2}
                  bgColor={"#EEEEEE"}
                  color={"black"}
                  rounded={6}
                >
                  <Image
                    src={`${import.meta.env.VITE_IMAGE_PATH}/${
                      recommendation.poster_path
                    }`}
                    alt={recommendation.title}
                    width={"20%"}
                    height={"100%"}
                  />
                  <Box>
                    <Badge marginTop={2} colorScheme="green">
                      {recommendation.vote_average}
                    </Badge>
                    <Text marginTop={2}>
                      {getGenreNames(recommendation.genre_ids)}
                    </Text>
                    <Text fontSize="lg" marginTop={2} fontWeight="bold">
                      {recommendation.title}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default MovieDetails;
