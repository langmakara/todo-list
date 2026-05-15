import { Box } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../page/home";
import Login from "../page/login";
import Navbar from "../components/Navbar";

const Index = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
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

export default Index;
