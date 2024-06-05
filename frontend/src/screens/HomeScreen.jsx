import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import MainSection from "../components/MainSection";

const HomeScreen = () => {
  return (
    <Box display={"flex"} pos={"relative"} overflow={"hidden"}>
      <Box
        flexShrink={0}
        bgColor={"rgba(232,232,232,0.1)"}
        height={"100vh"}
        width={"15%"}
        pos={"fixed"}
      >
        <Navbar />
      </Box>

      <Box
        ml={"15%"} // Add margin-left to create space for the fixed Navbar
        flexGrow={1}
        width={"85%"}
      >
        <MainSection />
      </Box>
    </Box>
  );
};

export default HomeScreen;
