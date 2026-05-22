import { useState, useRef, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../store/theme";

const AnimatedSelect = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useThemeStore((s) => s.darkMode);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Box position="relative" ref={containerRef} w="100%">
      <Flex
        align="center"
        justify="space-between"
        onClick={() => setIsOpen(!isOpen)}
        cursor="pointer"
        h="40px"
        px={4}
        rounded={16}
        bg={darkMode ? "#1a1a2e" : "gray.50"}
        border="2px solid"
        borderColor={isOpen ? "purple.400" : (darkMode ? "whiteAlpha.300" : "gray.100")}
        color={darkMode ? "white" : "gray.700"}
        transition="all 0.2s"
        _hover={{ borderColor: "purple.400" }}
        userSelect="none"
      >
        <Text fontSize="sm">{selectedOption ? selectedOption.label : placeholder}</Text>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon />
        </motion.div>
      </Flex>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <Box
              bg={darkMode ? "#252542" : "white"}
              border="1px solid"
              borderColor={darkMode ? "whiteAlpha.200" : "gray.100"}
              borderRadius="16px"
              boxShadow="0 10px 30px rgba(0,0,0,0.15)"
              overflow="hidden"
              py={1}
            >
              {options.map((option) => (
                <Box
                  key={option.value}
                  px={4}
                  py={2}
                  cursor="pointer"
                  bg={value === option.value ? (darkMode ? "rgba(167, 139, 250, 0.2)" : "purple.50") : "transparent"}
                  color={value === option.value ? "purple.400" : (darkMode ? "white" : "gray.700")}
                  _hover={{
                    bg: darkMode ? "whiteAlpha.100" : "gray.50",
                  }}
                  transition="all 0.15s"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  <Text fontSize="sm" fontWeight={value === option.value ? "semibold" : "normal"}>
                    {option.label}
                  </Text>
                </Box>
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default AnimatedSelect;
