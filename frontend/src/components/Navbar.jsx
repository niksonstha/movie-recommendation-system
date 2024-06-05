// Navbar.js
import {
  Box,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import ProfileModal from "../modal/ProfileModal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    Cookies.remove("uid");
    navigate("/login");
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={"100%"}
    >
      <Box>
        <Text
          fontSize={"1.5rem"}
          fontWeight={"bold"}
          letterSpacing={4}
          textAlign={"center"}
          mt={5}
          color={"#7D98A1"}
        >
          CineWave
        </Text>
        <UnorderedList
          mt={8}
          ml={9}
          listStyleType={"none"}
          display={"flex"}
          flexDir={"column"}
          gap={6}
        >
          <ListItem
            _hover={{ color: "#FCCB06" }}
            cursor={"pointer"}
            letterSpacing={1.5}
            transition={"all 0.2s ease-in"}
          >
            Home
          </ListItem>
          <ListItem
            _hover={{ color: "#FCCB06" }}
            cursor={"pointer"}
            letterSpacing={1.5}
            transition={"all 0.2s ease-in"}
          >
            Browse
          </ListItem>
          <ListItem
            _hover={{ color: "#FCCB06" }}
            cursor={"pointer"}
            letterSpacing={1.5}
            transition={"all 0.2s ease-in"}
          >
            Trending
          </ListItem>
          <ListItem
            _hover={{ color: "#FCCB06" }}
            cursor={"pointer"}
            letterSpacing={1.5}
            transition={"all 0.2s ease-in"}
          >
            Playlist
          </ListItem>
        </UnorderedList>
      </Box>
      <Box ml={10} mb={10}>
        <Text
          _hover={{ color: "#FCCB06" }}
          cursor={"pointer"}
          letterSpacing={1.5}
          transition={"all 0.2s ease-in"}
          onClick={onOpen}
        >
          My Profile
        </Text>
        <Text
          mt={5}
          _hover={{ color: "#FCCB06" }}
          cursor={"pointer"}
          letterSpacing={1.5}
          transition={"all 0.2s ease-in"}
          onClick={onLogoutHandler}
        >
          Logout
        </Text>
      </Box>

      <ProfileModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Navbar;
