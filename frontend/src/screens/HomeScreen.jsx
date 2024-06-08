import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useState } from "react";

const HomeScreen = () => {
  const [hideNavbar, setHideNavbar] = useState(false);

  const hideNavbarHandler = () => {
    setHideNavbar(!hideNavbar);
  };

  return (
    <Box display={"flex"} pos={"relative"} overflow={"hidden"}>
      <Box
        fontSize={"2rem"}
        mt={2}
        position={"fixed"}
        zIndex={1004}
        bgColor={"#F6F1EE"}
        color={"black"}
        cursor={"pointer"}
        rounded={5}
        onClick={hideNavbarHandler}
        transition={"all 0.3s ease"}
      >
        {hideNavbar ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
      </Box>
      <Box
        height={"100vh"}
        width={["85%", "85%", "65%", "15%"]}
        pos={"fixed"}
        display={hideNavbar ? "block" : "none"}
        transition={"all 0.3s ease"}
        zIndex={1000}
        bgColor={"#1C2321"}
      >
        <Navbar />
      </Box>

      <Box
        ml={hideNavbar ? "15%" : "0"}
        width={hideNavbar ? "85%" : "100%"}
        transition={"all 0.3s ease"}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomeScreen;
