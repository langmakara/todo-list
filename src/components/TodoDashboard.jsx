import { CalendarIcon, CheckCircleIcon, SunIcon, TimeIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, CardHeader, Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useGetTodo } from "../hooks/todo";
import TodoList from "./todoList";

const StatCard = ({ icon, label, value, subtext, color, gradient }) => (
  <Box>
    <Card
      h="130px"
      rounded={15}
      bg="white"
      shadow="0 4px 20px rgba(0,0,0,0.08)"
      border="1px solid"
      borderColor="gray.100"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", shadow: "0 8px 30px rgba(0,0,0,0.12)" }}
    >
      <CardHeader p={4} pb={0}>
        <Flex justify="space-between" align="center">
          <Text color="gray.500" fontSize="sm" fontWeight="medium">
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
        <Text color="gray.400" fontSize="xs" fontWeight="medium">
          {subtext}
        </Text>
      </CardBody>
    </Card>
  </Box>
);

const TodoDashboard = () => {
  const getTodo = useGetTodo({
    config: {
      enabled: true,
      retry: false,
    },
  });

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
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          Dashboard
        </Text>
        <Text color="gray.500" fontSize="sm">
          Welcome back! Here's your task overview
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        <StatCard
          icon={<CalendarIcon color="#6366f1" fontSize="20px" />}
          label="All Tasks"
          value={allTodo.length}
          subtext="Across all categories"
          color="#6366f1"
          gradient="linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)"
        />
        <StatCard
          icon={<CheckCircleIcon color="#10b981" fontSize="20px" />}
          label="Completed"
          value={completedTodo.length}
          subtext={`${completionRate}% completion rate`}
          color="#10b981"
          gradient="linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"
        />
        <StatCard
          icon={<TimeIcon color="#3b82f6" fontSize="20px" />}
          label="In Progress"
          value={inProgressTodo.length}
          subtext="Tasks awaiting completion"
          color="#3b82f6"
          gradient="linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)"
        />
        <StatCard
          icon={<SunIcon color="#ef4444" fontSize="20px" />}
          label="High Priority"
          value={highPriorityTodo.length}
          subtext="Needs urgent attention"
          color="#ef4444"
          gradient="linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)"
        />
      </SimpleGrid>
      <TodoList data={getTodo} />
    </>
  );
};

export default TodoDashboard;