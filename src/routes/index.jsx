import { Box } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../page/home";
import Login from "../page/login";
import Sidebar, { useSidebarStore } from "../components/sidebar";

const SIDEBAR_EXPANDED = 260
const SIDEBAR_COLLAPSED = 80

const Index = () => {
  const location = useLocation();
  const isHome = location.pathname === "/Home";
  const collapsed = useSidebarStore((s) => s.collapsed);
  const sidebarWidth = isHome ? (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED) : 0;

  return (
    <>
      {isHome && <Sidebar />}
      <Box
        bg="#e9eaf7ff"
        ml={`${sidebarWidth}px`}
        minH="100vh"
        transition="margin-left 0.2s ease"
      >
        <Box w={isHome ? "auto" : 1200} mx={isHome ? 0 : "auto"} p={isHome ? 8 : 0}>
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
