import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../api/userApi";
import { useEffect } from "react";
import Cookies from "js-cookie";

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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onRegisterHandler = async (data) => {
    await registerUser(
      data.fullname,
      data.username,
      data.email,
      data.password,
      data.cpassword
    );
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateUser = () => {
    const cookie = Cookies.get("uid");

    if (cookie) {
      navigate("/");
    }
  };
  useEffect(() => {
    validateUser();
  }, [validateUser]);

  return (
    <Box display={"flex"} justifyContent={"center"} height={"100vh"} mt={5}>
      <Box height={"50vh"} width={["90%", "80%", "60%", "40%"]}>
        <Box display={"flex"} flexDirection={"column"} gap={5}>
          <Box
            as="h1"
            fontSize={["1.5rem", "2rem"]}
            fontWeight={"bold"}
            letterSpacing={5}
            textAlign={"center"}
          >
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
        <Box display={"flex"} flexDir={"column"}>
          <Button mt={5} onClick={handleSubmit(onRegisterHandler)}>
            Register
          </Button>
        </Box>
        <Box mt={5} width={"max-content"}>
          <NavLink to={"/login"}>
            <Text
              fontSize={["1rem"]}
              _hover={{ color: "blue" }}
              transition={"all 0.2s ease-in"}
            >
              Already Have Account
            </Text>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
