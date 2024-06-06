/* eslint-disable react/prop-types */
import { Box, Image, Heading, Text, Stack, Badge } from "@chakra-ui/react";
import { fetchGenres } from "../../api/movieApi";
import { useEffect, useState } from "react";

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

const MovieCard = ({ movie }) => {
  const [genres, setGenres] = useState([]);
  const getLanguageName = (code) => {
    return languageMap[code] || code;
  };
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

  useEffect(() => {
    getGenres();
  }, []);
  const {
    title,
    poster_path,
    genre_ids,
    vote_average,
    original_language,
    release_date,
  } = movie;
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
      <Image
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
        height={"300px"}
        width={"100%"}
        objectFit="cover"
      />
      <Box p={5}>
        <Stack spacing={3}>
          <Heading fontSize="xl">{title}</Heading>
          <Text fontSize="sm" color="gray.500">
            {getGenreNames(genre_ids)}
          </Text>
          <Text>
            Rating: <Badge colorScheme="green">{vote_average}</Badge>
          </Text>
          <Text>Release Date: {release_date}</Text>
          <Text>Language: {getLanguageName(original_language)}</Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default MovieCard;
