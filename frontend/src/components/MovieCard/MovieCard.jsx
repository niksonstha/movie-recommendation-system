/* eslint-disable react/prop-types */
import { Box, Image, Heading, Text, Stack, Badge } from "@chakra-ui/react";
import { fetchGenres } from "../../api/movieApi";
import { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react"; // Import the Skeleton component
import { Link } from "react-router-dom";

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

const MovieCard = ({ movie, isSliding }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  const getLanguageName = (code) => {
    return languageMap[code] || code;
  };
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

  useEffect(() => {
    // Simulate a loading delay of 1500ms
    const timer = setTimeout(() => {
      getGenres();
    }, 1500);
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const {
    title,
    poster_path,
    genre_ids,
    vote_average,
    original_language,
    release_date,
  } = movie;

  // Render the skeleton loader while loading is true
  if (loading) {
    return (
      <Box
        maxW="sm"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        bg="#EEEEEE"
        color={"black"}
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }}
        m={2}
        height={"80vh"}
        cursor={"pointer"}
      >
        <Skeleton height="300px" width="100%" />
        <Box p={5}>
          <Stack spacing={3}>
            <Skeleton height="20px" width="80%" />
            <Skeleton height="15px" width="60%" />
            <Skeleton height="15px" width="40%" />
            <Skeleton height="15px" width="60%" />
            <Skeleton height="15px" width="50%" />
          </Stack>
        </Box>
      </Box>
    );
  }

  // Render the actual movie card when loading is false
  return (
    <Box
      maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="#EEEEEE"
      color={"black"}
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
      m={2}
      height={["50vh", "80vh"]}
      cursor={"pointer"}
    >
      <Link to={isSliding ? "/movieDetail?movieId=" + movie.id : ""}>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          height={["150px", "300px"]}
          width={"100%"}
          objectFit="cover"
        />
        <Box p={5}>
          <Stack spacing={3}>
            <Heading fontSize="xl">{title}</Heading>
            <Text fontSize="sm" color="gray.500">
              {getGenreNames(genre_ids)}
            </Text>
            {vote_average > 0 && (
              <Text>
                Rating: <Badge colorScheme="green">{vote_average}</Badge>
              </Text>
            )}
            <Text>Release Date: {release_date}</Text>
            <Text>Language: {getLanguageName(original_language)}</Text>
          </Stack>
        </Box>
      </Link>
    </Box>
  );
};

export default MovieCard;
