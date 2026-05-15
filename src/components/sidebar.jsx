import { create } from 'zustand'
import { Box, Button, Flex, Heading, Image, Text, VStack, Divider, IconButton, Tooltip } from "@chakra-ui/react";
import { IoGridOutline, IoListOutline, IoSettingsOutline, IoLogOutOutline, IoChevronBackOutline, IoChevronForwardOutline, IoLibrary } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import profile from "../assets/profile.jpg";

// --- Zustand Stores ---


const useSidebarStore = create((set) => ({
  collapsed: false,
  toggle: () => set((state) => ({ collapsed: !state.collapsed })),
}))


// --- Constants ---

const SIDEBAR_EXPANDED = 260
const SIDEBAR_COLLAPSED = 80

const navItems = [
  { label: "Dashboard", icon: IoGridOutline, path: "/Home" },
  { label: "My Tasks", icon: IoListOutline, path: "/Home" },
  { label: "Settings", icon: IoSettingsOutline, path: "/Home" },
]

// --- Component ---

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { collapsed, toggle } = useSidebarStore()

  const handleLogout = () => {
    navigate("/")
  }

  const width = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED

  return (
    <Box
      w={`${width}px`}
      h="100vh"
      bg="#a3b0e7ff"
      position="fixed"
      left={0}
      top={0}
      display="flex"
      flexDirection="column"
      p={collapsed ? 2 : 6}
      boxShadow="2px 0 10px rgba(0,0,0,0.1)"
      zIndex={100}
      transition="width 0.2s ease"
      overflow="hidden"
    >
      <Flex align="center" justify={collapsed ? "center" : "flex-start"} mb={6} mt={2}>
        {!collapsed && (
          <Heading display="flex" alignItems="center" gap={2} fontSize="2xl" fontWeight="bold" color="gray.800" whiteSpace="nowrap">
            <IoLibrary size={20} color="black" />Todo List
          </Heading>
        )}
        {collapsed && (
          <Box
            w="40px"
            h="40px"
            borderRadius="md"
            bg="rgba(255,255,255,0.3)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
          >
            <IoLibrary size={20} color="black" />
          </Box>
        )}
      </Flex>

      <Flex direction="column" align="center" mb={6}>
        <Image borderRadius="full" boxSize={collapsed ? "40px" : "70px"} src={profile} alt="Profile" mb={collapsed ? 0 : 2} transition="all 0.2s" />
        {!collapsed && (
          <>
            <Text fontSize="md" fontWeight="bold" color="gray.800" noOfLines={1}>
              Emily Johnson
            </Text>
            <Text fontSize="sm" color="gray.600">
              Welcome back!
            </Text>
          </>
        )}
      </Flex>

      <Divider borderColor="gray.400" mb={4} />

      <VStack spacing={1} align="stretch" flex={1}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          const btn = (
            <Button
              key={item.label}
              variant="ghost"
              justifyContent={collapsed ? "center" : "flex-start"}
              leftIcon={collapsed ? undefined : <Icon size={20} />}
              onClick={() => navigate(item.path)}
              bg={isActive ? "rgba(255,255,255,0.3)" : "transparent"}
              _hover={{ bg: "rgba(255,255,255,0.2)" }}
              borderRadius="lg"
              py={6}
              minW={collapsed ? "auto" : undefined}
              fontSize="md"
              fontWeight="medium"
              color="gray.700"
              title={collapsed ? item.label : undefined}
            >
              {collapsed ? <Icon size={22} /> : item.label}
            </Button>
          )
          return collapsed ? (
            <Tooltip key={item.label} label={item.label} placement="right" hasArrow>
              {btn}
            </Tooltip>
          ) : (
            btn
          )
        })}
      </VStack>

      <Divider borderColor="gray.400" mb={4} />

      <IconButton
        aria-label="Toggle sidebar"
        icon={collapsed ? <IoChevronForwardOutline size={18} /> : <IoChevronBackOutline size={18} />}
        onClick={toggle}
        variant="ghost"
        borderRadius="lg"
        mb={2}
        alignSelf={collapsed ? "center" : "flex-end"}
      />

      {collapsed ? (
        <Tooltip label="Logout" placement="right" hasArrow>
          <Button
            variant="ghost"
            justifyContent="center"
            onClick={handleLogout}
            colorScheme="red"
            borderRadius="lg"
            py={6}
            minW="auto"
          >
            <IoLogOutOutline size={22} />
          </Button>
        </Tooltip>
      ) : (
        <Button
          variant="ghost"
          justifyContent="flex-start"
          leftIcon={<IoLogOutOutline size={20} />}
          onClick={handleLogout}
          colorScheme="red"
          borderRadius="lg"
          py={6}
          fontSize="md"
        >
          Logout
        </Button>
      )}
    </Box>
  )
}

export default Sidebar
