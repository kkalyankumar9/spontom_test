import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../Redux/Auth/action";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  Text,
  Link as ChakraLink,
  useToast, // Import useToast
} from "@chakra-ui/react";

const Signup = () => {
  const initialData = {
    name: "",
    email: "",
    password: "",
  };
  const [signData, setSignData] = useState(initialData);
  const dispatch = useDispatch();
  const toast = useToast(); // Initialize useToast

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signData.name || !signData.email || !signData.password) {
      // Display validation error using toast
      toast({
        title: "Validation Error",
        description: "Please enter all required fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const user = {
      name: signData.name,
      email: signData.email,
      password: signData.password,
    };

    try {
      const response = await dispatch(signUp(user));
      console.log("Signup successful:", response);

      // Display success message using toast
      toast({
        title: "Signup Successful",
        description: "You have successfully signed up.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Display error message using toast
      console.error("Signup error:", error);
      toast({
        title: "Signup Error",
        description: "There was an error during signup. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Flex align="center" justify="center" minH="100vh">
        <Box maxW="md" w="full" bg="white" shadow="md" rounded="md" p="8">
          <Heading as="h1" size="xl" fontWeight="bold" mb="4">
            Sign Up
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb="4">
              <FormLabel htmlFor="name" fontSize="sm" fontWeight="bold" mb="2">
                Name
              </FormLabel>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                name="name"
                value={signData.name}
                onChange={handleChange}
                className="input"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel htmlFor="email" fontSize="sm" fontWeight="bold" mb="2">
                Email
              </FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={signData.email}
                onChange={handleChange}
                className="input"
              />
            </FormControl>
            <FormControl mb="6">
              <FormLabel htmlFor="password" fontSize="sm" fontWeight="bold" mb="2">
                Password
              </FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={signData.password}
                onChange={handleChange}
                className="input"
              />
            </FormControl>
            <Flex align="center" justify="center">
              <Button
                type="submit"
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.700" }}
                fontWeight="bold"
                rounded="md"
              >
                Sign Up
              </Button>
            </Flex>
          </form>
          <Text mt="2">Already signed up?</Text>
          <ChakraLink as={Link} to="/signin" color="blue.500" _hover={{ textDecoration: "underline" }}>
            Sign in
          </ChakraLink>
        </Box>
      </Flex>
    </>
  );
};

export default Signup;
