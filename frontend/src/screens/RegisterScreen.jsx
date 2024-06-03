import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const RegisterScreen = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} height={"100vh"}>
      <Box height={"50vh"} weight={"80%"}>
        <Box>
          <Box display={"flex"} flexDirection={"column"} gap={5}>
            <Box as="h1" fontSize="3rem" fontWeight={"bold"} letterSpacing={5}>
              REGISTRATION
            </Box>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>UserName</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" />
            </FormControl>
          </Box>
          <Button mt={5}>Register</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
