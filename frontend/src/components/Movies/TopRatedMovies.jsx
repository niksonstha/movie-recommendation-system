import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Heading } from "@chakra-ui/react";
import { topRated } from "../../api/movieApi";
import MovieCard from "../MovieCard/MovieCard";

const PopularMovies = () => {
  const [topRateMovies, setTopRateMovies] = useState([]);
  const [isSliding, setIsSliding] = useState(false);

  const getPopularMovies = async () => {
    const response = await topRated();
    setTopRateMovies(response);
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
    beforeChange: () => setIsSliding(true),
    afterChange: () => setIsSliding(false),
  };

  return (
    <Box ml={5} mt={3}>
      <Heading letterSpacing={4} mb={5}>
        Top Rated Movies
      </Heading>
      <Slider {...settings}>
        {topRateMovies.map((movie, index) => (
          <Box key={index}>
            <MovieCard key={index} movie={movie} isSliding={isSliding} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default PopularMovies;
