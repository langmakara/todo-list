import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, Checkbox, Flex, FormControl, FormLabel, Grid, GridItem, Heading, IconButton, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCheckmarkDoneSharp, IoPencilSharp, IoSearchCircleOutline, IoTrashBinSharp } from "react-icons/io5";
import { useAddTodo, useDeleteTodo, useUpdateTodo } from "../hooks/todo";

const TodoList = (props) => {
  const { data, isLoading, isError } = props;
  const allTodo = data?.data?.todos || [];
  const [filterTodo, setFilterTodo] = useState(allTodo);
  const completedTodo = allTodo.filter((todo) => todo.completed);
  const inProgressTodo = allTodo.filter((todo) => !todo.completed);
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm();
  const [selectId, setSelectId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const status = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  const filterCategory = [
    { label: "All", value: "all" },
    { label: "Personal", value: "personal" },
    { label: "Home", value: "home" },
    { label: "Work", value: "work" },
    { label: "Other", value: "other" },
  ];
  const [selectStatus, setSelectStatus] = useState(status[0]);
  const [filterSelectedCategory, setFilterSelectedCategory] = useState(filterCategory[0]);

  const { mutateAsync: updateTodo, isLoading: updateTodoLoading } = useUpdateTodo({
    config: {
      onSuccess: () => {
        if (toast.isActive('update-todo')) return;
        toast({
          id: 'update-todo',
          title: "Todo updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      },
      onError: (error) => {
        if (toast.isActive('update-todo-error')) return;
        toast({
          id: 'update-todo-error',
          title: "Error updating todo",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    },
  });

  const { mutateAsync: addTodo, isLoading: addTodoLoading } = useAddTodo({
    config: {
      onSuccess: () => {
        toast({
          title: "Task added!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        reset();
      },
      onError: (error) => {
        toast({
          title: "Error adding todo",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    },
  });

  const { mutateAsync: deleteTodo, isLoading: deleteTodoLoading } = useDeleteTodo({
    config: {
      onSuccess: () => {
        toast({
          title: "Task deleted",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      },
      onError: (error) => {
        toast({
          title: "Error deleting todo",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    },
  });

  const handleUpdateTodo = async (id, data) => {
    await updateTodo({ id, data });
  };

  const onSubmit = async (formData) => {
    try {
      const json = { todo: formData.todo, completed: false, userId: 1 };
      await addTodo(json);
    } catch (e) {
      toast({
        title: "Error adding todo",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" py={20}>
        <Text color="gray.500">Loading...</Text>
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justify="center" align="center" py={20}>
        <Text color="red.500">Error loading tasks</Text>
      </Flex>
    );
  }

  return (
    <Box mt={6}>
      <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={6}>
        <GridItem>
          <Card rounded={24} shadow="0 4px 20px rgba(0,0,0,0.08)" border="1px solid" borderColor="gray.100">
            <CardHeader p={5} pb={2}>
              <Heading fontSize="lg" fontWeight="bold" color="gray.700" display="flex" alignItems="center" gap={2}>
                <AddIcon color="purple.500" boxSize={3} />
                Quick Add Task
              </Heading>
            </CardHeader>
            <CardBody p={5} pt={2}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm" color="gray.600">Task Description</FormLabel>
                  <Input
                    {...register("todo")}
                    type="text"
                    placeholder="What needs to be done?"
                    rounded={16}
                    bg="gray.50"
                    border="2px solid"
                    borderColor="gray.100"
                    _focus={{ borderColor: "purple.400", bg: "white" }}
                    _placeholder={{ color: "gray.400" }}
                  />
                </FormControl>

                <SimpleGrid columns={2} spacing={3} w="100%">
                  <Box>
                    <FormControl>
                      <FormLabel fontSize="sm" color="gray.600">Category</FormLabel>
                      <Select
                        rounded={16}
                        bg="gray.50"
                        border="2px solid"
                        borderColor="gray.100"
                        _focus={{ borderColor: "purple.400", bg: "white" }}
                        {...register("category")}
                      >
                        <option value="personal">Personal</option>
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel fontSize="sm" color="gray.600">Priority</FormLabel>
                      <Select
                        rounded={16}
                        bg="gray.50"
                        border="2px solid"
                        borderColor="gray.100"
                        _focus={{ borderColor: "purple.400", bg: "white" }}
                        {...register("priority")}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </Select>
                    </FormControl>
                  </Box>
                </SimpleGrid>

                <FormControl>
                  <FormLabel fontSize="sm" color="gray.600">Due Date (Optional)</FormLabel>
                  <Input
                    type="date"
                    rounded={16}
                    bg="gray.50"
                    border="2px solid"
                    borderColor="gray.100"
                    _focus={{ borderColor: "purple.400", bg: "white" }}
                    {...register("dueDate")}
                  />
                </FormControl>

                <Button
                  w="100%"
                  colorScheme="purple"
                  size="lg"
                  rounded={16}
                  isLoading={addTodoLoading}
                  onClick={handleSubmit(onSubmit)}
                  mt={2}
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.2s"
                >
                  Add Task
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card rounded={24} shadow="0 4px 20px rgba(0,0,0,0.08)" border="1px solid" borderColor="gray.100">
            <CardHeader p={5} pb={3}>
              <Box p={4} bg="gray.50" rounded={20}>
                <Grid templateColumns={{ base: "1fr", md: "1fr auto" }} gap={4}>
                  <GridItem>
                    <InputGroup size="lg">
                      <InputLeftElement pointerEvents="none">
                        <IoSearchCircleOutline size="22px" color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder="Search tasks..."
                        rounded={16}
                        bg="white"
                        border="2px solid"
                        borderColor="gray.200"
                        _focus={{ borderColor: "purple.400", boxShadow: "none" }}
                        _placeholder={{ color: "gray.400" }}
                        onChange={(e) => {
                          const value = e.target.value.toLowerCase();
                          if (!value) {
                            setFilterTodo(allTodo);
                            return;
                          }
                          setFilterTodo(allTodo.filter(t => t.todo.toLowerCase().includes(value)));
                        }}
                      />
                    </InputGroup>
                  </GridItem>
                  <GridItem>
                    <Flex gap={2} bg="white" p={1} rounded={16} border="2px solid" borderColor="gray.200">
                      {status.map((item) => (
                        <Button
                          key={item.value}
                          size="sm"
                          fontSize="sm"
                          fontWeight="medium"
                          px={4}
                          colorScheme={item.value === selectStatus.value ? "purple" : "gray"}
                          variant={item.value === selectStatus.value ? "solid" : "ghost"}
                          borderRadius={14}
                          onClick={() => {
                            setSelectStatus(item);
                            if (item.value === "all") {
                              setFilterTodo(allTodo);
                            } else if (item.value === "active") {
                              setFilterTodo(inProgressTodo);
                            } else {
                              setFilterTodo(completedTodo);
                            }
                          }}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </Flex>
                  </GridItem>
                </Grid>

                <Flex mt={4} gap={2} flexWrap="wrap">
                  {filterCategory.map((item) => (
                    <Button
                      key={item.value}
                      size="sm"
                      fontSize="xs"
                      fontWeight="medium"
                      px={3}
                      py={1}
                      colorScheme={item.value === filterSelectedCategory.value ? "purple" : "gray"}
                      variant={item.value === filterSelectedCategory.value ? "solid" : "outline"}
                      borderRadius="full"
                      borderColor="gray.300"
                      onClick={() => {
                        setFilterSelectedCategory(item);
                        if (item.value === "all") {
                          setFilterTodo(allTodo);
                        } else if (item.value === "personal" || item.value === "home" || item.value === "work" || item.value === "other") {
                          setFilterTodo(allTodo.filter(t => t.category === item.value));
                        }
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Flex>
              </Box>
            </CardHeader>

            <CardBody p={5} pt={2}>
              <Box>
                <Text fontWeight="bold" color="gray.600" mb={4} fontSize="sm">
                  {filterTodo.length} {filterTodo.length === 1 ? "task" : "tasks"}
                </Text>

                {filterTodo.length === 0 ? (
                  <Box textAlign="center" py={10}>
                    <Text color="gray.400" fontSize="lg">No tasks found</Text>
                    <Text color="gray.400" fontSize="sm">Add a new task to get started</Text>
                  </Box>
                ) : (
                  <VStack spacing={3} align="stretch">
                    {filterTodo.map((todo) => (
                      <Card
                        key={todo.id}
                        py={3}
                        px={4}
                        rounded={18}
                        shadow="0 2px 8px rgba(0,0,0,0.06)"
                        border="1px solid"
                        borderColor={todo.completed ? "green.100" : "gray.100"}
                        bg={todo.completed ? "green.50" : "white"}
                        transition="all 0.2s"
                        _hover={{ shadow: "0 4px 12px rgba(0,0,0,0.1)", transform: "translateX(4px)" }}
                      >
                        <Flex align="center" justify="space-between">
                          <Flex align="center" flex={1}>
                            <Checkbox
                              isChecked={todo.completed}
                              onChange={() => handleUpdateTodo(todo.id, { completed: !todo.completed })}
                              colorScheme="green"
                              size="lg"
                              mr={3}
                            />
                            {editId === todo.id ? (
                              <Input
                                value={editValue}
                                size="sm"
                                rounded={12}
                                autoFocus
                                mr={2}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleUpdateTodo(todo.id, { todo: editValue });
                                    setEditId(null);
                                  }
                                  if (e.key === "Escape") {
                                    setEditId(null);
                                  }
                                }}
                              />
                            ) : (
                              <Text
                                textDecoration={todo.completed ? "line-through" : "none"}
                                color={todo.completed ? "gray.400" : "gray.700"}
                                fontWeight={todo.completed ? "normal" : "medium"}
                                fontSize="md"
                              >
                                {todo.todo}
                              </Text>
                            )}
                          </Flex>

                          <Flex align="center" gap={1}>
                            {editId === todo.id ? (
                              <IconButton
                                aria-label="Save"
                                size="sm"
                                colorScheme="green"
                                icon={<IoCheckmarkDoneSharp />}
                                onClick={() => {
                                  handleUpdateTodo(todo.id, { todo: editValue });
                                  setEditId(null);
                                }}
                                rounded={12}
                              />
                            ) : (
                              <IconButton
                                aria-label="Edit"
                                size="sm"
                                variant="ghost"
                                icon={<IoPencilSharp />}
                                onClick={() => {
                                  setEditId(todo.id);
                                  setEditValue(todo.todo);
                                }}
                                rounded={12}
                                color="gray.500"
                                _hover={{ color: "purple.500", bg: "purple.50" }}
                              />
                            )}
                            <IconButton
                              aria-label="Delete"
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectId({ id: todo.id });
                                deleteTodo(todo.id);
                              }}
                              isDisabled={todo.id === selectId?.id && deleteTodoLoading}
                              icon={<IoTrashBinSharp />}
                              rounded={12}
                              color="gray.500"
                              _hover={{ color: "red.500", bg: "red.50" }}
                            />
                          </Flex>
                        </Flex>
                      </Card>
                    ))}
                  </VStack>
                )}
              </Box>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TodoList;