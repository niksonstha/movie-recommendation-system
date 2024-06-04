import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../api/userApi";

// Define the validation schema using Yup
const schema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onRegisterHandler = async (data) => {
    const register = await registerUser(
      data.fullname,
      data.username,
      data.email,
      data.password,
      data.cpassword
    );
    console.log(register);
  };

  return (
    <Box display={"flex"} justifyContent={"center"} height={"100vh"}>
      <Box height={"50vh"} width={"40%"}>
        <Box>
          <Box display={"flex"} flexDirection={"column"} gap={5}>
            <Box as="h1" fontSize="3rem" fontWeight={"bold"} letterSpacing={5}>
              REGISTRATION
            </Box>
            <FormControl isInvalid={errors.fullname}>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" {...register("fullname")} />
              <FormErrorMessage>{errors.fullname?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.username}>
              <FormLabel>UserName</FormLabel>
              <Input type="text" {...register("username")} />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register("email")} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register("password")} />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.cpassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" {...register("cpassword")} />
              <FormErrorMessage>{errors.cpassword?.message}</FormErrorMessage>
            </FormControl>
          </Box>
          <Button mt={5} onClick={handleSubmit(onRegisterHandler)}>
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
