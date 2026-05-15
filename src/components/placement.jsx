import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";

const Placement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box>
      <IconButton variant="outline" colorScheme="teal" aria-label="Send email" ref={btnRef} onClick={onOpen} icon={<HamburgerIcon />} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
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
