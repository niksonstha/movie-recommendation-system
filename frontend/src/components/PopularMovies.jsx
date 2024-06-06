import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Heading } from "@chakra-ui/react";
import { popularMovies, fetchGenres } from "../api/movieApi";
import MovieCard from "./MovieCard";

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

const PopularMovies = () => {
  const [popular, setPopular] = useState([]);
  const [genres, setGenres] = useState([]);

  const getPopularMovies = async () => {
    const response = await popularMovies();
    setPopular(response); // Assuming the API returns results in response.data.results
  };

  const getGenres = async () => {
    const genresResponse = await fetchGenres();
    setGenres(genresResponse);
  };

  useEffect(() => {
    getPopularMovies();
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

  // Carousel settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Number of cards to show at once
    slidesToScroll: 4, // Number of cards to scroll
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box ml={5} mt={3}>
      <Heading letterSpacing={4} mb={5}>
        Popular Movies
      </Heading>
      <Slider {...settings}>
        {popular.map((movie, index) => (
          <Box key={index}>
            <MovieCard
              key={index}
              movie={movie}
              getGenreNames={getGenreNames}
              getLanguageName={getLanguageName}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default PopularMovies;
