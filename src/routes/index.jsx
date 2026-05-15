import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/home";
import Login from "../page/login";

export default function index() {
  return (
    <>
      <Box bg="#DCEAF2" h="100vh">
        <Box w={1200} mx="auto">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}
