import { Box, ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../page/home";
import Login from "../page/login";
import Sidebar from "../components/sidebar";
import { useSidebarStore } from "../store/sidebar";
import { useThemeStore } from "../store/theme";

const SIDEBAR_EXPANDED = 260
const SIDEBAR_COLLAPSED = 80

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "#1a1a2e" : "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
      },
    }),
  },
  colors: {
    brand: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },
  },
})

const Index = () => {
  const location = useLocation();
  const isHome = location.pathname === "/Home";
  const collapsed = useSidebarStore((s) => s.collapsed);
  const darkMode = useThemeStore((s) => s.darkMode);
  const sidebarWidth = isHome ? (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED) : 0;

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {isHome && <Sidebar />}
      <Box
        bg={darkMode ? "#1a1a2e" : "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)"}
        ml={`${sidebarWidth}px`}
        minH="100vh"
        transition="margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      >
        <Box w={isHome ? "auto" : 1200} mx={isHome ? 0 : "auto"} p={isHome ? 8 : 0}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Index;