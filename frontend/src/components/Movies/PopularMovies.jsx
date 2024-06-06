import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Heading } from "@chakra-ui/react";
import { popularMovies } from "../../api/movieApi";
import MovieCard from "../MovieCard/MovieCard";

const PopularMovies = () => {
  const [popular, setPopular] = useState([]);

  const getPopularMovies = async () => {
    const response = await popularMovies();
    setPopular(response);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // Number of cards to show at once
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
            <MovieCard key={index} movie={movie} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default PopularMovies;
