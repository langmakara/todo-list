import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { IoLibrary } from "react-icons/io5";

const Placement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [placement] = React.useState('left')

  return (
    <Box>
      <Button variant="solid" colorScheme="white" aria-label="Send email" ref={btnRef} onClick={onOpen}>
        <IoLibrary size={20} color="white" />
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Placement;
