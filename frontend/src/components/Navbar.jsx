import {
  Box,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import ProfileModal from "../modal/ProfileModal";
import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdTrendingUp, IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import {
  MdOutlineLocalMovies,
  MdOutlineUpcoming,
  MdVerticalAlignTop,
} from "react-icons/md";
import { useRef } from "react";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose,
  } = useDisclosure();
  const navigate = useNavigate();
  const cancelRef = useRef();

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
          <ListItem className="list">
            <MdOutlineLocalMovies />
            <NavLink to={"/"}>Now Playing</NavLink>
          </ListItem>
          <ListItem className="list">
            <IoMdTrendingUp />
            <NavLink to={"/trending"}>Trending</NavLink>
          </ListItem>
          <ListItem className="list">
            <MdOutlineUpcoming />
            <NavLink>Upcoming</NavLink>
          </ListItem>
          <ListItem className="list">
            <MdVerticalAlignTop />
            <NavLink>Top Rated</NavLink>
          </ListItem>
        </UnorderedList>
      </Box>
      <Box ml={10} mb={10}>
        <Box className="profile__action">
          <CiUser />
          <Text onClick={onProfileOpen}>My Profile</Text>
        </Box>
        <Box mt={5} className="profile__action">
          <IoIosLogOut />
          <Text onClick={onLogoutOpen}>Logout</Text>
        </Box>
      </Box>

      <ProfileModal isOpen={isProfileOpen} onClose={onProfileClose} />

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        isOpen={isLogoutOpen}
        leastDestructiveRef={cancelRef}
        onClose={onLogoutClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color={"black"}>
              Logout
            </AlertDialogHeader>

            <AlertDialogBody color={"black"}>
              Are you sure you want to logout?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onLogoutClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onLogoutHandler} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Navbar;
