import {
  Button,
  Flex,
  Spacer,
  Image,
  Link as ChakraLink,
  Heading,
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Redux/Auth/action';
import PatientBar from './Task_Operations/Taskbar';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
    alert('logout');
  };

  return (
    <Box >
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="teal.500"
      position="fixed"
      top="0"
  
      width="100%"
      zIndex="1"
      p={{ base: '2', md: '4' }} // Adjust padding for responsiveness
      color="white"
    >
      <ChakraLink as={Link} to="/">
        <Flex align="center">
          <Image
            src="https://image.similarpng.com/very-thumbnail/2022/01/Health-Medical-Logo-design-isolated-on-transparent-background-PNG.png"
            alt="Profile Avatar"
            boxSize={{ base: '10', md: '14' }} // Adjust box size for responsiveness
            mr="2"
          />
          <Heading size="md">Health Info</Heading>
        </Flex>
      </ChakraLink>

      <Spacer />

      <Flex display={{ base: 'none', md: 'flex' }} spacing={4}>
        <ChakraLink as={Link} to="/addpatient">
          <Button bg="teal.500" color="white" _hover={{ bg: 'teal.700' }}>
            Add patient
          </Button>
        </ChakraLink>

        <Box>
          {!isAuth && (
          <ChakraLink
          as={Link}
          to="/signup"
          fontSize={{ base: 'sm', md: 'lg' }}
          _hover={{ textDecoration: 'underline' }}
          bg="orange"
          color="white"
          px="4"  // Increase or decrease the padding as needed
          py="2"  // Increase or decrease the padding as needed
          rounded="md"
          transition="background 0.3s ease-in-out, color 0.3s ease-in-out"
          _focus={{ outline: 'none' }} // Remove focus outline if it's not desired
        >
          Sign up
        </ChakraLink>
        
          )}
          {isAuth ? (
            <Button
            fontSize={{ base: 'sm', md: 'lg' }}
            _hover={{ textDecoration: 'underline' }}
            bg="orange"
            color="white"
            px="4"  // Increase or decrease the padding as needed
            py="2"  // Increase or decrease the padding as needed
            rounded="md"
            transition="background 0.3s ease-in-out, color 0.3s ease-in-out"
            _focus={{ outline: 'none' }} 
              onClick={handleClick}
            >
              Logout
            </Button>
          ) : (
            <ChakraLink
              as={Link}
              to="/signin"
              fontSize={{ base: 'sm', md: 'lg' }}
              _hover={{ textDecoration: 'underline' }}
              bg="orange"
              color="white"
              px="4"  // Increase or decrease the padding as needed
              py="2"  // Increase or decrease the padding as needed
              rounded="md"
              transition="background 0.3s ease-in-out, color 0.3s ease-in-out"
              _focus={{ outline: 'none' }} 
            >
              Sign in
            </ChakraLink>
          )}
        </Box>
      </Flex>

      <Flex display={{ base: 'flex', md: 'none' }}>
        <Button color="white" onClick={onOpen}>
          <HamburgerIcon />
        </Button>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing="4">
              <ChakraLink as={Link} to="/addtask">
                <Button w="full" bg="teal.500" color="white" _hover={{ bg: 'teal.700' }}>
                  Add patient
                </Button>
              </ChakraLink>

              <ChakraLink as={Link} to="/signup">
                <Button
                  w="full"
                  fontSize={{ base: 'sm', md: 'lg' }} // Adjust font size for responsiveness
                  bg="orange"
                  color="white"
                  _hover={{ textDecoration: 'underline' }}
                  rounded="md"
                >
                  Sign up
                </Button>
              </ChakraLink>

              {isAuth ? (
                <Button
                  w="full"
                  fontSize={{ base: 'sm', md: 'lg' }} // Adjust font size for responsiveness
                  bg="orange.500"
                  color="white"
                  onClick={handleClick}
                  _hover={{ textDecoration: 'underline' }}
                  rounded="md"
                >
                  Logout
                </Button>
              ) : (
                <ChakraLink as={Link} to="/signin">
                  <Button
                    w="full"
                    fontSize={{ base: 'sm', md: 'lg' }} // Adjust font size for responsiveness
                    bg="orange"
                    color="white"
                    _hover={{ textDecoration: 'underline' }}
                    rounded="md"
                  >
                    Sign in
                  </Button>
                </ChakraLink>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
    <PatientBar/>
    </Box>
  );
};

export default Navbar;
