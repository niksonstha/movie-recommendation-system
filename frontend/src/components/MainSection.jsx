import { Box, Image, Input, Text } from "@chakra-ui/react";
import { fetchMovies } from "../api/movieApi";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { CiSearch } from "react-icons/ci";
import PopularMovies from "./Movies/PopularMovies";
import TopRatedMovies from "./Movies/TopRatedMovies";

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
        width={"30%"}
        pos={"relative"}
        display={"flex"}
        alignItems={"center"}
        mb={4}
        mt={6}
        ml={4}
      >
        <Box pos={"absolute"} fontSize={"1.8rem"} ml={2}>
          <CiSearch />
        </Box>
        <Input
          type="text"
          placeholder="Search everything"
          paddingLeft={10}
          variant="flushed"
        />
      </Box>

      <Box
        height={"max-content"}
        backgroundColor={"#1C2321"}
        position={"relative"}
      >
        <Box
          pos={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          height={"10%"}
          background={
            "linear-gradient(360deg, rgba(28,35,33,0) 20%, rgba(28,35,33,1) 90%)"
          }
          zIndex={1}
        />
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
                zIndex={2}
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
      <Box mt={4}>
        <PopularMovies />
        <TopRatedMovies />
      </Box>
    </Box>
  );
};

export default MainSection;
