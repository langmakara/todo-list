import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/home";
import Login from "../page/login";
import Navbar from "../components/Navbar";

export default function index() {
  return (
    <>
      <Navbar />
      <Box bg="#e9eaf7ff">
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
