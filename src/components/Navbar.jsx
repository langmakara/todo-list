import { Box, Button, Flex, Heading, Image, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    navigate("/");
    toast({ title: "Logout success", status: "error", duration: 5000, isClosable: true });
  };
  return (
    <Box p={4} px={20} display="flex" justifyContent="space-between" alignItems="center" bg="#a3b0e7ff">
      <Box display="flex" alignItems="center">
        <Heading fontSize="xl" fontWeight="bold" display="flex" alignItems="center">
          Todo List
        </Heading>
      </Box>
      <Box>
        <SimpleGrid columns={3}>
          <Box mr={3}>
            <Text fontSize="md" fontWeight="bold" align="center">
              Emily Johnson
            </Text>
            <Text color="gray.600" fontSize="sm">
              Welcome back!
            </Text>
          </Box>

          <Box display="flex" alignItems="center">
            <Image borderRadius="full" boxSize="40px" src={profile} alt="Dan Abramov" />
          </Box>
          <Button colorScheme="red" size="sm" rounded="10px" py={2} onClick={handleLogout} alignSelf="center">
            <Box>Logout</Box>
            <Flex justify="flex-end">
              <Box ml={2} pt={1}>
                <IoLogOutOutline size={20} />
              </Box>
            </Flex>
          </Button>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Navbar;
