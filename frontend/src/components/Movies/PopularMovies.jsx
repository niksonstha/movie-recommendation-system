import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Heading } from "@chakra-ui/react";
import { popularMovies } from "../../api/movieApi";
import MovieCard from "../MovieCard/MovieCard";

const PopularMovies = () => {
  const [popular, setPopular] = useState([]);
  const [isSliding, setIsSliding] = useState(true);

  const getPopularMovies = async () => {
    const response = await popularMovies();
    setPopular(response);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  // Carousel settings
  const settings = {
    infinite: false,
    speed: 500,
    // slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
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
    beforeChange: () => setIsSliding(false),
    afterChange: () => setIsSliding(true),
  };

  return (
    <Box ml={{ base: 2, md: 5 }} mt={{ base: 2, md: 3 }}>
      <Heading letterSpacing={4} mb={5}>
        Popular Movies
      </Heading>
      <Slider {...settings}>
        {popular.map((movie, index) => (
          <Box key={index}>
            <MovieCard key={index} movie={movie} isSliding={isSliding} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default PopularMovies;
