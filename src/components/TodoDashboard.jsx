import { CalendarIcon, CheckCircleIcon, SunIcon, TimeIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, CardHeader, Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useGetTodo } from "../hooks/todo";
import TodoList from "./todoList";

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
        <Spinner size="xl" />
      </Flex>
    );
  }

  const allTodo = getTodo?.data?.todos || [];


  const completedTodo = allTodo.filter((todo) => todo.completed);
  const inProgressTodo = allTodo.filter((todo) => !todo.completed);
  const highPriorityTodo = allTodo.filter((todo) => todo.priority === "high");

  console.log("getTodo", getTodo);
  console.log("getTodo?.data", getTodo?.data);
  console.log("todos", getTodo?.data?.todos);

  return (
    <>
      <SimpleGrid columns={4} spacing={5} mt={2}>
        <Box>
          <Card px={2} h="118px" rounded={20}>
            <CardHeader p={2} mt={2}>
              <SimpleGrid columns={2}>
                <Text color="gray.600" fontFamily="sans-serif">
                  All To-Do
                </Text>
                <Flex justify="flex-end">
                  <CalendarIcon color="gray.700" fontSize="20px" />
                </Flex>
              </SimpleGrid>
            </CardHeader>
            <CardBody p={1}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.700">
                {allTodo.length}
              </Text>
              <Text color="gray.600" fontSize="xs">
                Across all categories
              </Text>
            </CardBody>
          </Card>
        </Box>
        <Box>
          <Card px={2} h="118px" rounded={20}>
            <CardHeader p={2} mt={2}>
              <SimpleGrid columns={2}>
                <Text color="gray.600" fontFamily="sans-serif">
                  Completed
                </Text>
                <Flex justify="flex-end">
                  <CheckCircleIcon color="green" fontSize="20px" />
                </Flex>
              </SimpleGrid>
            </CardHeader>
            <CardBody p={1}>
              <Text fontSize="2xl" fontWeight="bold" color="green">
                {completedTodo.length}
              </Text>
              <Box h="1" bg="green" w={`${(completedTodo.length / allTodo.length) * 100}%`} my={2} borderRadius="10px"></Box>
            </CardBody>
          </Card>
        </Box>
        <Box>
          <Card px={2} h="118px" rounded={20}>
            <CardHeader p={2} mt={2}>
              <SimpleGrid columns={2}>
                <Text color="gray.600" fontFamily="sans-serif">
                  In Progress
                </Text>
                <Flex justify="flex-end">
                  <TimeIcon color="blue" fontSize="20px" />
                </Flex>
              </SimpleGrid>
            </CardHeader>
            <CardBody p={1}>
              <Text fontSize="2xl" fontWeight="bold" color="blue">
                {inProgressTodo.length}
              </Text>
              <Text color="gray.600" fontSize="xs">
                Awaiting completion
              </Text>
            </CardBody>
          </Card>
        </Box>
        <Box>
          <Card px={2} h="118px" rounded={20}>
            <CardHeader p={2} mt={2}>
              <SimpleGrid columns={2}>
                <Text color="gray.600" fontFamily="sans-serif">
                  High Priority
                </Text>
                <Flex justify="flex-end">
                  <SunIcon color="red" fontSize="20px" />
                </Flex>
              </SimpleGrid>
            </CardHeader>
            <CardBody p={1}>
              <Text fontSize="2xl" fontWeight="bold" color="red">
                {highPriorityTodo.length}
              </Text>
              <Text color="gray.600" fontSize="xs">
                Needs urgent attention
              </Text>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
      <TodoList data={getTodo} />
    </>
  );
};

export default TodoDashboard;
