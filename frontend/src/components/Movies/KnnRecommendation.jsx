import {
  Badge,
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchKnnrecommendRecommendation } from "../../api/recommendation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const KnnRecommendation = () => {
  const [knnrecommendRecommendation, setKnnrecommendRecommendation] = useState(
    []
  );

  const token = Cookies.get("uid");
  let userId = "";

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken._id;
  }

  const getKnnrecommendRecommendation = async () => {
    const response = await fetchKnnrecommendRecommendation(userId);
    setKnnrecommendRecommendation(response.data.recommendations);
  };

  useEffect(() => {
    getKnnrecommendRecommendation();
  }, []);
  return (
    <Box>
      {knnrecommendRecommendation.length > 0 && (
        <Heading
          letterSpacing={4}
          mb={5}
          ml={4}
          bgColor={"red.400"}
          color={"white"}
          width={"max-content"}
          padding={3}
          rounded={5}
          fontSize={["0.9rem", "1.2rem"]}
          fontFamily={"poppins"}
        >
          You may also like
        </Heading>
      )}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)", // 1 column for small screens
          md: "repeat(2, 1fr)", // 2 columns for medium screens
          lg: "repeat(3, 1fr)", // 3 columns for large screens
          xl: "repeat(5, 1fr)", // 4 columns for extra-large screens
        }}
      >
        {knnrecommendRecommendation?.map((movie) => (
          <GridItem key={movie.movieId}>
            <Box
              borderRadius="lg"
              boxShadow="md"
              mb={5}
              mx={2}
              height={"150px"}
            >
              <Link to={"/movieDetail?movieId=" + movie.movieId}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  bgColor={"white"}
                  color={"black"}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    width="100px"
                    height={"max-content"}
                    objectFit="cover"
                  />
                  <Box p={5}>
                    <Stack spacing={2}>
                      <Heading fontSize="xl" noOfLines={1}>
                        {movie.title}
                      </Heading>
                      <Text fontSize="sm" color="gray.500">
                        {movie.release_date}
                      </Text>
                      <Text fontSize="md" noOfLines={3}>
                        {movie.genres.join(", ")}
                      </Text>
                      <Box>
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          {movie.runtime} minute
                        </Badge>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Link>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default KnnRecommendation;