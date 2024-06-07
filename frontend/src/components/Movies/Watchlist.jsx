import { Box, Heading, Text, VStack, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchWatchlist } from "../../api/watchlistApi";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const token = Cookies.get("uid");
  let userid = "";

  if (token) {
    const decodedToken = jwtDecode(token);
    userid = decodedToken._id;
  }

  const getWatchlist = async () => {
    const response = await fetchWatchlist(userid);
    setWatchlist(response.data["watchlist"]);
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
    <Box mt={5}>
      <Heading fontFamily={"Poppins"} letterSpacing={4} mb={4}>
        Your Watchlist
      </Heading>
      <VStack align="stretch" spacing={4}>
        {watchlist.map((item) => (
          <Box
            key={item._id}
            borderRadius="md"
            boxShadow="md"
            bgColor="gray.100"
            display="flex"
            alignItems="center"
            height={"100px"}
            color={"black"}
            width={"95%"}
          >
            <Image
              src={`${import.meta.env.VITE_IMAGE_PATH}/w200/${item.poster_path}`}
              alt={item.title}
              width={"10%"}
              height="100%"
              borderRadiusLeft="md"
              objectFit="cover"
            />
            <VStack align="flex-start" spacing={2} ml={4}>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                {item.title}
              </Text>
              <Text>{item.genres.join(", ")}</Text>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Watchlist;
