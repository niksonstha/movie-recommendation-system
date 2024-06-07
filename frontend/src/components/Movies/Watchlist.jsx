/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Heading, Text } from "@chakra-ui/react";
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
  console.log(watchlist);

  useEffect(() => {
    getWatchlist();
  }, []);
  return (
    <Box mt={5}>
      <Heading fontFamily={"Poppins"} letterSpacing={4} mb={4}>
        Your Watchlist
      </Heading>
      {watchlist.map((watchlist) => (
        <Box key={watchlist._id}>
          <Text>{watchlist.title}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Watchlist;
