import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import Placement from "./Placement";



const Navbar = () => {
    return (
        <Box p={4} px={20} display="flex" justifyContent="space-between" alignItems="center" bg="#b8bdd3ff">
            <Box display="flex" alignItems="center">
                <Placement />
                <Heading fontSize="xl" fontWeight="bold" display="flex" alignItems="center">
                    Todo List
                </Heading>
            </Box>
            <Box>
                <Button colorScheme="red" size="sm" rounded="10px" py={2}>
                    <Box>Logout</Box>
                    <Flex justify="flex-end">
                        <Box ml={2} pt={1}>
                            <IoLogOutOutline size={20}/>
                        </Box>
                    </Flex>
                </Button>
            </Box>
        </Box>
    )
}   

export default Navbar;