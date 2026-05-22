import { create } from 'zustand'
import { Box, Button, Flex, Heading, Image, Text, VStack, Divider, IconButton, Tooltip } from "@chakra-ui/react";
import { IoGridOutline, IoListOutline, IoSettingsOutline, IoLogOutOutline, IoChevronBackOutline, IoChevronForwardOutline, IoLibrary } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import profile from "../assets/profile.jpg";

export const useSidebarStore = create((set) => ({
  collapsed: false,
  toggle: () => set((state) => ({ collapsed: !state.collapsed })),
}))

const SIDEBAR_EXPANDED = 260
const SIDEBAR_COLLAPSED = 80

const navItems = [
  { label: "Dashboard", icon: IoGridOutline, path: "/Home" },
  { label: "My Tasks", icon: IoListOutline, path: "/Home" },
  { label: "Settings", icon: IoSettingsOutline, path: "/Home" },
]

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
      bg="linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)"
      position="fixed"
      left={0}
      top={0}
      display="flex"
      flexDirection="column"
      p={collapsed ? 2 : 6}
      boxShadow="4px 0 20px rgba(0,0,0,0.3)"
      zIndex={100}
      transition="width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      overflow="hidden"
    >
      <Flex align="center" justify={collapsed ? "center" : "flex-start"} mb={6} mt={2}>
        {!collapsed && (
          <Heading display="flex" alignItems="center" gap={2} fontSize="2xl" fontWeight="bold" color="white" whiteSpace="nowrap">
            <Box p={2} bg="rgba(255,255,255,0.15)" borderRadius="lg">
              <IoLibrary size={20} color="#a78bfa" />
            </Box>
            Todo List
          </Heading>
        )}
        {collapsed && (
          <Box
            w="40px"
            h="40px"
            borderRadius="lg"
            bg="rgba(255,255,255,0.1)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xl"
            fontWeight="bold"
            color="white"
            transition="all 0.3s"
            _hover={{ bg: "rgba(255,255,255,0.2)" }}
          >
            <IoLibrary size={20} color="#a78bfa" />
          </Box>
        )}
      </Flex>

      <Flex direction="column" align="center" mb={6}>
        <Box position="relative">
          <Image borderRadius="full" boxSize={collapsed ? "40px" : "70px"} src={profile} alt="Profile" mb={collapsed ? 0 : 2} transition="all 0.3s" border="3px solid" borderColor="rgba(167, 139, 250, 0.5)" />
          {!collapsed && (
            <Box position="absolute" bottom={collapsed ? -1 : 0} right={collapsed ? "35%" : "30%"} w="12px" h="12px" bg="green.400" borderRadius="full" border="2px solid #1a1a2e" />
          )}
        </Box>
        {!collapsed && (
          <>
            <Text fontSize="md" fontWeight="bold" color="white" noOfLines={1} mt={2}>
              Emily Johnson
            </Text>
            <Text fontSize="sm" color="gray.400">
              Welcome back!
            </Text>
          </>
        )}
      </Flex>

      <Divider borderColor="whiteAlpha.200" mb={4} />

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
              bg={isActive ? "rgba(167, 139, 250, 0.3)" : "transparent"}
              _hover={{ bg: isActive ? "rgba(167, 139, 250, 0.4)" : "rgba(255,255,255,0.1)" }}
              borderRadius="lg"
              py={6}
              minW={collapsed ? "auto" : undefined}
              fontSize="md"
              fontWeight={isActive ? "bold" : "medium"}
              color={isActive ? "#a78bfa" : "gray.300"}
              title={collapsed ? item.label : undefined}
              transition="all 0.2s"
            >
              {collapsed ? <Icon size={22} /> : item.label}
            </Button>
          )
          return collapsed ? (
            <Tooltip key={item.label} label={item.label} placement="right" hasArrow bg="gray.800">
              {btn}
            </Tooltip>
          ) : (
            btn
          )
        })}
      </VStack>

      <Divider borderColor="whiteAlpha.200" mb={4} />

      <IconButton
        aria-label="Toggle sidebar"
        icon={collapsed ? <IoChevronForwardOutline size={18} /> : <IoChevronBackOutline size={18} />}
        onClick={toggle}
        variant="ghost"
        borderRadius="lg"
        mb={2}
        alignSelf={collapsed ? "center" : "flex-end"}
        color="gray.400"
        _hover={{ bg: "rgba(255,255,255,0.1)", color: "white" }}
        transition="all 0.2s"
      />

      {collapsed ? (
        <Tooltip label="Logout" placement="right" hasArrow bg="gray.800">
          <Button
            variant="ghost"
            justifyContent="center"
            onClick={handleLogout}
            colorScheme="red"
            borderRadius="lg"
            py={6}
            minW="auto"
            _hover={{ bg: "rgba(229, 62, 62, 0.3)" }}
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
          _hover={{ bg: "rgba(229, 62, 62, 0.3)" }}
        >
          Logout
        </Button>
      )}
    </Box>
  )
}

export default Sidebar