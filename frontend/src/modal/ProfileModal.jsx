/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Box,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { changePassword } from "../api/userApi";

const ProfileModal = ({ isOpen, onClose }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [openChangePasswordInput, setOpenChangePasswordInput] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const toast = useToast();

  // Parse the cookie to get the token
  const token = Cookies.get("uid");
  let userEmail = "";
  let userFullname = "";
  let userid = "";

  if (token) {
    const decodedToken = jwtDecode(token);
    userEmail = decodedToken.email;
    userFullname = decodedToken.fullname;
    userid = decodedToken._id;
  }

  const onChangePasswordHanlder = async () => {
    try {
      const response = await changePassword(userid, oldPassword, newPassword);
      // console.log(response["data"].status == "ok");

      if (response["data"].status == "ok") {
        toast({
          title: "Password changed successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Cannot change password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="black">Your Details</ModalHeader>
        <Box color={"black"}>
          <ModalCloseButton />
        </Box>
        <ModalBody pb={6} color="black">
          <FormControl>
            <FormLabel>Fullname: {userFullname}</FormLabel>
          </FormControl>

          <FormControl>
            <FormLabel>Email: {userEmail}</FormLabel>
          </FormControl>

          <Box>
            <Text
              color={"blue"}
              cursor={"pointer"}
              width={"max-content"}
              onClick={() =>
                setOpenChangePasswordInput(!openChangePasswordInput)
              }
            >
              Change password
            </Text>

            {openChangePasswordInput && (
              <FormControl mt={4} display={"flex"} flexDir={"column"} gap={4}>
                <Input
                  type="text"
                  placeholder="Enter your old password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Enter your new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onChangePasswordHanlder}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
