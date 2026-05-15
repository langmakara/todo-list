import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, Checkbox, Flex, FormControl, FormLabel, Grid, GridItem, Heading, IconButton, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoPencilSharp, IoSearchCircleOutline, IoTrashBinSharp } from "react-icons/io5";
import { useAddTodo, useUpdateTodo } from "../hooks/todo";

const TodoList = (props) => {
  const { data, isLoading, isError } = props;
  const allTodo = data?.data?.todos || [];
  const [filterTodo, setFilterTodo] = useState(allTodo);
  const completedTodo = allTodo.filter((todo) => todo.completed);
  const inProgressTodo = allTodo.filter((todo) => !todo.completed);
  const toast = useToast();
  const { register, handleSubmit } = useForm();

  const status = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  const filterCategory = [
    { label: "Personal", value: "personal" },
    { label: "Home", value: "home" },
    { label: "Work", value: "work" },
    { label: "Other", value: "other" },
  ];
  const [selectStatus, setSelectStatus] = useState(status[0]);
  const { mutateAsync: updateTodo, isLoading: updateTodoLoading } = useUpdateTodo({
    config: {
      onSuccess: () => {
        toast({
          title: "Todo updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error updating todo",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    },
  });

  const { mutateAsync: addTodo, isLoading: addTodoLoading } = useAddTodo({
    config: {
      onSuccess: () => {
        toast({
          title: "Todo added successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error adding todo",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    },
  });

  const handleUpdateTodo = async (id, data) => {
    await updateTodo({ id, data });
  };

  const onSubmit = async (data) => {
    try {
      const json = { todo: data.todo, completed: false, userId: 1 };
      await addTodo(json);
      console.log(json);
    } catch (e) {
      toast({
        title: "Error adding todo",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error...</Box>;
  }

  return (
    <Box mt={5}>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {/* Left: 1 column */}
        <GridItem colSpan={1}>
          <Box>
            <Card maxW="md" rounded={20} shadow="2xl" h="50vh" onSubmit={handleSubmit(onSubmit)}>
              <CardHeader p={2} mt={2} mx={2}>
                <Heading fontSize="md" fontWeight="bold">
                  <PlusSquareIcon color="purple" /> Quick Add Task
                </Heading>
              </CardHeader>
              <CardBody p={2} px={5} my={2}>
                <VStack>
                  <Box w="100%">
                    <FormControl>
                      <FormLabel fontSize="sm">Task Description</FormLabel>
                      <Input {...register("todo")} type="text" placeholder="Task Description" rounded={15} />
                    </FormControl>
                  </Box>
                  <Box w="100%" mt={4}>
                    <SimpleGrid columns={2} spacing={4}>
                      <Box w="100%">
                        <FormControl>
                          <FormLabel fontSize="sm">Category</FormLabel>
                          <Select>
                            <option value="Personal">Personal</option>
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box w="100%">
                        <FormControl>
                          <FormLabel fontSize="sm">Priority</FormLabel>
                          <Select>
                            <option value="Low">🟢 Low</option>
                            <option value="Medium">🟡 Medium</option>
                            <option value="High">🔴 High</option>
                          </Select>
                        </FormControl>
                      </Box>
                    </SimpleGrid>
                  </Box>
                  <Box w="100%" h="50px">
                    <FormControl>
                      <FormLabel fontSize="sm">Due Date (Optional)</FormLabel>
                      <Input type="text" placeholder="Due Date" />
                    </FormControl>
                  </Box>
                  <Box w="100%" mt={8}>
                    <Button w="100%" colorScheme="brand" mt={2} rounded={15} isLoading={addTodoLoading} onClick={handleSubmit(onSubmit)}>
                      Add Todo
                    </Button>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </Box>
        </GridItem>

        {/* Right: 2 columns */}
        <GridItem colSpan={2}>
          <Box>
            <Card rounded={20}>
              <CardHeader>
                <Box p={4}>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    <GridItem colSpan={2}>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <IoSearchCircleOutline size="20px" color="gray.300" />
                        </InputLeftElement>
                        <Input
                          //   isInvalid={searchLoading}
                          outline="2px solid blue"
                          placeholder="Search todo"
                          //   onChange={(e) => {
                          //     const value = e.target.value;
                          //     if (!value) {
                          //       setSearchData(null);
                          //       return;
                          //     }
                          //     searchEmployee(value);
                          //   }}
                        />
                      </InputGroup>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Box w="100%" display="flex" justifyContent="space-between" bg="gray.100" rounded={10}>
                        {status.map((item) => {
                          return (
                            <Button
                              key={item.value}
                              fontSize="xs"
                              p={1}
                              colorScheme={item.value === selectStatus.value ? "brand" : "gray.100"}
                              fontWeight="bold"
                              color={item.value === selectStatus.value ? "white" : "black"}
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
                          );
                        })}
                      </Box>
                    </GridItem>
                  </Grid>
                </Box>
              </CardHeader>
              <CardBody>
                <Box w="100%" justifyContent="space-between" rounded={10}>
                  {filterCategory.map((item) => {
                    return (
                      <Button
                        key={item.value}
                        size='xs'
                        fontSize="xs"
                        mr={3}
                        p={1}
                        colorScheme={item.value === selectStatus.value ? "blue" : "gray.100"}
                        fontWeight="bold"
                        color={item.value === selectStatus.value ? "white" : "black"}
                        onClick={() => {
                          setSelectStatus(item);
                          if (item.value === "personal") {
                            setFilterTodo(allTodo);
                          } else if (item.value === "work") {
                            setFilterTodo(inProgressTodo);
                          } else {
                            setFilterTodo(completedTodo);
                          }
                        }}
                      >
                        {item.label}
                      </Button>
                    );
                  })}
                </Box>
                <Box mt={4}>
                  <Text fontWeight="bold" mb={2}>
                    Todo
                  </Text>
                  {filterTodo.map((todo) => (
                    <Card key={todo.id} my={2} p={1}>
                      <CardBody>
                        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                          <GridItem colSpan={3}>
                            <Checkbox
                              isChecked={todo.completed}
                              isLoading={updateTodoLoading}
                              onChange={() => {
                                handleUpdateTodo(todo.id, { completed: !todo.completed ? true : false });
                              }}
                            >
                              <Text textDecoration={todo.completed ? "line-through" : "none"}>{todo.todo}</Text>
                            </Checkbox>
                          </GridItem>
                          <GridItem colSpan={1}>
                            <Flex justify="flex-end">
                              <IconButton aria-label="Call Segun" size="xs" mr={2} icon={<IoPencilSharp />} />
                              <IconButton aria-label="Call Segun" size="xs" icon={<IoTrashBinSharp />} />
                            </Flex>
                          </GridItem>
                        </Grid>
                      </CardBody>
                    </Card>
                  ))}
                </Box>
              </CardBody>
            </Card>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TodoList;
