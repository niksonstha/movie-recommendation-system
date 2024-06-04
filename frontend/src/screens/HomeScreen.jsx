import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import MainSection from "../components/MainSection";

const HomeScreen = () => {
  return (
    <Box display={"flex"} height={"100vh"} bgColor={"#1C2321"}>
      <Box flexGrow={1} bgColor={"rgba(232,232,232,0.1)"} maxW={"15%"}>
        <Navbar />
      </Box>

      <Box flexGrow={5}>
        <MainSection />
      </Box>
    </Box>
  );
};

export default HomeScreen;
