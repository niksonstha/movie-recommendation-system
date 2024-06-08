/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Heading, Text, VStack, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteWatchlist, fetchWatchlist } from "../../api/watchlistApi";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // State to manage loading status
  const token = Cookies.get("uid");
  let userid = "";

  if (token) {
    const decodedToken = jwtDecode(token);
    userid = decodedToken._id;
  }

  const getWatchlist = async () => {
    const response = await fetchWatchlist(userid);
    console.log(response);
    setWatchlist(response.data["watchlist"]);
    setIsLoaded(true); // Set loading status to true after fetching data
  };

  const handleDelete = async (id) => {
    await deleteWatchlist(id);
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((item) => item._id !== id)
    );
  };

  useEffect(() => {
    if (!isLoaded) {
      // Ensure getWatchlist is called only once
      getWatchlist();
    }
  }, [isLoaded]);

  return (
    <Box mt={5}>
      <Heading fontFamily={"Poppins"} letterSpacing={4} mb={4}>
        Your Watchlist
      </Heading>
      {watchlist.length > 0 ? (
        <VStack align="stretch" spacing={4}>
          <AnimatePresence>
            {watchlist.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  borderRadius="md"
                  boxShadow="md"
                  bgColor="gray.100"
                  display="flex"
                  alignItems="center"
                  height={"12vh"}
                  color={"black"}
                  width={"95%"}
                  pos={"relative"}
                >
                  <Box
                    cursor={"pointer"}
                    fontSize={"2xl"}
                    pos={"absolute"}
                    top={-2}
                    right={-3}
                    bgColor={"#DC5F00"}
                    padding={1}
                    rounded={20}
                    onClick={() => handleDelete(item._id)}
                  >
                    <RxCross2 color="#EEEEEE" />
                  </Box>
                  <Image
                    src={`${import.meta.env.VITE_IMAGE_PATH}/w200/${
                      item.poster_path
                    }`}
                    alt={item.title}
                    width={"10%"}
                    height="100%"
                    objectFit="cover"
                    borderLeftRadius={'md'}
                  />
                  <VStack align="flex-start" spacing={2} ml={4}>
                    <Box display={"flex"} gap={2} mt={2}>
                      <Text mb={2}>{item.runtime + " minutes / "}</Text>
                      <Text mb={2}>{item.release_date + " / "}</Text>
                      <Text>{item.genres.join(", ")}</Text>
                    </Box>

                    <Text
                      fontSize="xl"
                      letterSpacing={2}
                      fontWeight="bold"
                      mb={2}
                    >
                      {item.title}
                    </Text>
                  </VStack>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </VStack>
      ) : (
        <Text bgColor={"red"} width={"max-content"} padding={2} rounded={6}>
          No movies in your watchlist.
        </Text>
      )}
    </Box>
  );
};

export default Watchlist;
