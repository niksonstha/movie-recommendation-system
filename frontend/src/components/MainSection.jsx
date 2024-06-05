import { Box, Image, Text } from "@chakra-ui/react";
import { fetchMovies } from "../api/movieApi";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const MainSection = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await fetchMovies();
    const results = response.data.results;
    setMovies(
      results.map((movie) => ({
        ...movie,
        overview: movie.overview.slice(0, 200) + " ...",
      }))
    );
    console.log(results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Box>
      <Box
        height={"max-content"}
        backgroundColor={"#1C2321"}
        position={"relative"}
      >
        <Carousel
          emulateTouch={true}
          autoPlay={true}
          interval={9000}
          infiniteLoop={true}
          showStatus={false}
          showThumbs={false}
          style={{ height: "100%" }}
        >
          {movies?.map((movie, index) => (
            <Box key={index} pos={"relative"} height={"80vh"}>
              <Image
                src={`${import.meta.env.VITE_IMAGE_PATH}/${
                  movie.backdrop_path
                }`}
                alt="banner"
                objectFit={"cover"}
                width={"100%"}
                height={"100%"}
                opacity={0.7} // Adjust opacity to blend with the background
              />
              <Box
                pos={"absolute"}
                zIndex={1}
                top={"30%"}
                left={8}
                textAlign={"left"}
                width={"50%"}
              >
                <Text fontSize={"4xl"} fontWeight={"bold"}>
                  {movie.title}
                </Text>
                <Text fontSize={"md"} textAlign={"justify"}>
                  {movie.overview}
                </Text>
                <Text
                  bgColor={"red"}
                  fontSize={"sm"}
                  width={"max-content"}
                  padding={2}
                  rounded={8}
                  mt={2}
                  fontWeight={"bold"}
                >
                  Release date: {movie.release_date}
                </Text>
              </Box>
            </Box>
          ))}
        </Carousel>
        <Box
          pos={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          height={"100%"}
          background={
            "linear-gradient(180deg, rgba(28,35,33,0) 20%, rgba(28,35,33,1) 90%)"
          }
          zIndex={0}
        />
      </Box>
    </Box>
  );
};

export default MainSection;
