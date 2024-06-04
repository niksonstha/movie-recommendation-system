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
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";

const ProfileModal = ({ isOpen, onClose }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="black">Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} color="black">
          <FormControl>
            <FormLabel>Fullname</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Enter your Fullname"
              _placeholder={{ color: "black" }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email"
              _placeholder={{ color: "black" }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
