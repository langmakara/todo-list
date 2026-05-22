import { CalendarIcon, CheckCircleIcon, SunIcon, TimeIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, CardHeader, Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useGetTodo } from "../hooks/todo";
import TodoList from "./todoList";
import { useThemeStore } from "../store/theme";

const StatCard = ({ icon, label, value, subtext, color, gradient }) => {
  const darkMode = useThemeStore((s) => s.darkMode);

  return (
    <Box>
      <Card
        h="130px"
        rounded={24}
        bg={darkMode ? "#252542" : "white"}
        shadow={darkMode ? "none" : "0 4px 20px rgba(0,0,0,0.08)"}
        border="1px solid"
        borderColor={darkMode ? "whiteAlpha.200" : "gray.100"}
        transition="all 0.3s"
        _hover={{ transform: "translateY(-4px)", shadow: darkMode ? "0 4px 20px rgba(0,0,0,0.3)" : "0 8px 30px rgba(0,0,0,0.12)" }}
      >
        <CardHeader p={2} pb={0}>
          <Flex justify="space-between" align="center">
            <Text color={darkMode ? "gray.400" : "gray.500"} fontSize="sm" fontWeight="medium">
              {label}
            </Text>
            <Box p={2} borderRadius="xl" bg={gradient} boxShadow={`0 2px 10px ${color}20`}>
              {icon}
            </Box>
          </Flex>
        </CardHeader>
        <CardBody p={4} pt={2}>
          <Text fontSize="3xl" fontWeight="bold" color={color} mb={1}>
            {value}
          </Text>
          <Text color={darkMode ? "gray.500" : "gray.400"} fontSize="xs" fontWeight="medium">
            {subtext}
          </Text>
        </CardBody>
      </Card>
    </Box>
  );
};

const TodoDashboard = () => {
  const { t } = useTranslation();
  const getTodo = useGetTodo({
    config: {
      enabled: true,
      retry: false,
    },
  });

  const darkMode = useThemeStore((s) => s.darkMode);

  if (getTodo.isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="purple.500" thickness="4px" />
      </Flex>
    );
  }

  const allTodo = getTodo?.data?.todos || [];
  const completedTodo = allTodo.filter((todo) => todo.completed);
  const inProgressTodo = allTodo.filter((todo) => !todo.completed);
  const highPriorityTodo = allTodo.filter((todo) => todo.priority === "high");

  const completionRate = allTodo.length > 0 ? Math.round((completedTodo.length / allTodo.length) * 100) : 0;

  return (
    <>
      <Box mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color={darkMode ? "white" : "gray.800"}>
          {t("label.dashboard")}
        </Text>
        <Text color={darkMode ? "gray.400" : "gray.500"} fontSize="sm">
          {t("label.dashboard_subtitle")}
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        <StatCard
          icon={<CalendarIcon color="#6366f1" fontSize="20px" />}
          label={t("label.all_tasks")}
          value={allTodo.length}
          subtext={t("label.across_categories")}
          color="#6366f1"
          gradient="linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)"
        />
        <StatCard
          icon={<CheckCircleIcon color="#10b981" fontSize="20px" />}
          label={t("label.completed")}
          value={completedTodo.length}
          subtext={`${completionRate}${t("label.completion_rate")}`}
          color="#10b981"
          gradient="linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"
        />
        <StatCard
          icon={<TimeIcon color="#3b82f6" fontSize="20px" />}
          label={t("label.in_progress")}
          value={inProgressTodo.length}
          subtext={t("label.awaiting_completion")}
          color="#3b82f6"
          gradient="linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)"
        />
        <StatCard
          icon={<SunIcon color="#ef4444" fontSize="20px" />}
          label={t("label.high_priority")}
          value={highPriorityTodo.length}
          subtext={t("label.needs_attention")}
          color="#ef4444"
          gradient="linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)"
        />
      </SimpleGrid>
      <TodoList data={getTodo} />
    </>
  );
};

export default TodoDashboard;