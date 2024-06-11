/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Image,
  Text,
  Spinner,
  Center,
  Badge,
  Button,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGenres, movieDetail } from "../../api/movieApi";
import { FaPlus, FaStar } from "react-icons/fa";
import { addWatchlist } from "../../api/watchlistApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { addRating, fetchUserRating } from "../../api/ratingApi";

const MovieDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("movieId");

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [userRating, setUserRating] = useState(0);

  const toast = useToast();
  const token = Cookies.get("uid");
  let userId = "";

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken._id;
  }

  const getGenres = async () => {
    const genresResponse = await fetchGenres();
    setGenres(genresResponse);
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
      setMovie(response);
    } catch (error) {
      console.error("Failed to fetch movie details", error);
    }
  };

  const getRecommendation = async () => {
    try {
      const response = await movieDetail(movieId, true);
      setRecommendations(response);
    } catch (error) {
      console.error("Failed to fetch recommendations", error);
    }
  };

  const getUserRating = async () => {
    try {
      const response = await fetchUserRating(movieId, userId);
      setUserRating(response.data.rating);
    } catch (error) {
      setUserRating(0);
    }
  };

  const handleRating = async (rating) => {
    try {
      await addRating(movieId, userId, rating);
      setUserRating(rating);
      toast({
        title: "Rating submitted!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to submit rating",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleWatchlist = async () => {
    const response = await addWatchlist(
      movie.id,
      userId,
      movie.title,
      movie.release_date,
      movie.runtime,
      movie.poster_path,
      movie.genres.map((genre) => genre.name)
    );

    try {
      if (response.data.success) {
        toast({
          title: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: response.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    getGenres();
    getMovieDetails();
    getRecommendation();
    getUserRating();
    setLoading(false);
  }, [movieId]);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!movie) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <>
      <Box display="flex" flexDirection="column" position="relative">
        <Box position="relative" marginBottom={[150, 300]}>
          <Image
            src={`${import.meta.env.VITE_IMAGE_PATH}/original/${
              movie.backdrop_path
            }`}
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
          flexDirection={["column", "row"]}
          position="absolute"
          top={400}
          zIndex={20}
          margin={[0, 4]}
        >
          <Image
            src={`${import.meta.env.VITE_IMAGE_PATH}/original/${
              movie.poster_path
            }`}
            alt={movie.title}
            borderRadius="md"
            width={["100%", "80%", "40%"]}
            height={["30vh", "40vh", "70vh"]}
            objectFit="cover"
            display={["none", "block"]}
          />
          <Box width={["100%", "80%", "50%"]} ml={[0, 0, 5]} mt={4} padding={2}>
            <Text
              fontSize={["xl", "2xl", "3xl", "4xl"]}
              fontWeight="bold"
              bgColor={"red"}
              padding={1}
              rounded={5}
              width={"max-content"}
            >
              {movie.title}
            </Text>
            <Text fontSize={["sm", "md"]} marginTop={2} textAlign="justify">
              {movie.overview}
            </Text>
            <Text fontSize={["sm", "md"]} marginTop={2} color="gray.500">
              Release date: {movie.release_date}
            </Text>
            <Text fontSize={["sm", "md"]} marginTop={2} color="gray.500">
              Runtime: {movie.runtime} minutes
            </Text>
            <Text fontSize={["sm", "md"]} marginTop={2} color="gray.500">
              Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </Text>
            {movie.tagline && (
              <Text fontSize={["sm", "md"]} marginTop={2} color="gray.500">
                Tagline: {movie.tagline}
              </Text>
            )}
            {movie.vote_average > 0 && (
              <Badge fontSize={["sm", "md"]} marginTop={2} colorScheme="green">
                Vote Average: {movie.vote_average}
              </Badge>
            )}
            {movie.vote_count > 0 && (
              <Text fontSize={["sm", "md"]} marginTop={2} color="gray.500">
                Vote Count: {movie.vote_count}
              </Text>
            )}
            <Box display="flex" alignItems="center" marginTop={2}>
              <Text fontSize={["sm", "md"]} marginRight={2} color="gray.500">
                Your Rating:
              </Text>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton
                  key={star}
                  icon={<FaStar />}
                  color={star <= userRating ? "yellow.400" : "gray.300"}
                  onClick={() => handleRating(star)}
                  variant="ghost"
                  size="sm"
                />
              ))}
            </Box>
            <Button
              marginTop={4}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
              rounded={20}
              onClick={handleWatchlist}
            >
              <Box fontSize={"1.2rem"}>
                <FaPlus />
              </Box>
              <Text>Add to Watchlist</Text>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box mt={[100, 80, 50, 20]}>
        {recommendations?.length > 0 && (
          <Box padding={5}>
            <Text fontSize="3xl" fontWeight="bold" marginBottom={3}>
              Recommendations
            </Text>
            <Box
              display="grid"
              gridTemplateColumns={[
                "repeat(1, 1fr)",
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
              ]}
              gap={2}
              height={"max-content"}
            >
              {recommendations.slice(0, 8).map((recommendation) => (
                <Box
                  key={recommendation.id}
                  display={"flex"}
                  bgColor={"#EEEEEE"}
                  color={"black"}
                  rounded={6}
                  height={"120px"}
                >
                  <Link
                    to={`/movieDetail?movieId=${recommendation.id}`}
                    width={"25%"}
                  >
                    <Image
                      src={`${import.meta.env.VITE_IMAGE_PATH}/w200/${
                        recommendation.poster_path
                      }`}
                      alt={recommendation.title}
                      height={"100%"}
                      roundedLeft={6}
                    />
                  </Link>
                  <Box width={"75%"}>
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
