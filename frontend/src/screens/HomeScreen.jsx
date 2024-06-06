import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const HomeScreen = () => {
  return (
    <Box display={"flex"} pos={"relative"} overflow={"hidden"}>
      <Box flexShrink={0} height={"100vh"} width={"15%"} pos={"fixed"}>
        <Navbar />
      </Box>

      <Box ml={"15%"} flexGrow={1} width={"85%"}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomeScreen;
