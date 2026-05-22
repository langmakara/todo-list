import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, Checkbox, Flex, FormControl, FormLabel, Grid, GridItem, Heading, IconButton, Input, InputGroup, InputLeftElement, SimpleGrid, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoCheckmarkDoneSharp, IoPencilSharp, IoSearchCircleOutline, IoTrashBinSharp } from "react-icons/io5";
import { useAddTodo, useDeleteTodo, useUpdateTodo } from "../hooks/todo";
import { useThemeStore } from "../store/theme";
import AnimatedSelect from "./AnimatedSelect";

const TodoList = (props) => {
  const { t } = useTranslation();
  const { data } = props;
  const isLoading = data?.isLoading;
  const isError = data?.isError;
  const darkMode = useThemeStore((s) => s.darkMode);
  
  const allTodo = data?.data?.todos || [];
  const toast = useToast();

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      todo: "",
      category: "personal",
      priority: "medium",
      dueDate: new Date().toISOString().split('T')[0]
    }
  });

  const categoryValue = watch("category");
  const priorityValue = watch("priority");

  const [selectId, setSelectId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const status = [
    { label: t("label.all"), value: "all" },
    { label: t("label.active"), value: "active" },
    { label: t("label.completed"), value: "completed" },
  ];

  const filterCategory = [
    { label: t("label.all"), value: "all" },
    { label: t("label.personal"), value: "personal" },
    { label: t("label.home"), value: "home" },
    { label: t("label.work"), value: "work" },
    { label: t("label.other"), value: "other" },
  ];

  const [selectStatus, setSelectStatus] = useState(status[0]);
  const [filterSelectedCategory, setFilterSelectedCategory] = useState(filterCategory[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Derived filter state dynamically on render
  const filterTodo = allTodo.filter((todo) => {
    // 1. Search Query Filter
    if (searchQuery && !todo.todo?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // 2. Status Filter
    if (selectStatus.value === "active" && todo.completed) {
      return false;
    }
    if (selectStatus.value === "completed" && !todo.completed) {
      return false;
    }
    // 3. Category Filter
    if (filterSelectedCategory.value !== "all" && todo.category !== filterSelectedCategory.value) {
      return false;
    }
    return true;
  });

  const { mutateAsync: updateTodo } = useUpdateTodo({
    config: {
      onSuccess: () => {
        if (toast.isActive('update-todo')) return;
        toast({
          id: 'update-todo',
          title: t("label.todo_updated"),
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
          title: t("label.error"),
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
          title: t("label.todo_added"),
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        reset({
          todo: "",
          category: "personal",
          priority: "medium",
          dueDate: new Date().toISOString().split('T')[0]
        });
      },
      onError: (error) => {
        toast({
          title: t("label.error"),
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
          title: t("label.todo_deleted"),
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      },
      onError: (error) => {
        toast({
          title: t("label.error"),
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
      const json = {
        todo: formData.todo,
        completed: false,
        userId: 1,
        category: formData.category || "personal",
        priority: formData.priority || "medium",
        dueDate: formData.dueDate || new Date().toISOString().split('T')[0]
      };
      await addTodo(json);
    } catch (e) {
      toast({
        title: t("label.error"),
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
        <Text color="gray.500">{t("label.loading") || "Loading..."}</Text>
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justify="center" align="center" py={20}>
        <Text color="red.500">{t("label.error") || "An error occurred."}</Text>
      </Flex>
    );
  }

  return (
    <Box mt={6}>
      <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={6}>
        <GridItem>
          <Card
            rounded={24}
            shadow={darkMode ? "none" : "0 4px 20px rgba(0,0,0,0.08)"}
            border="1px solid"
            borderColor={darkMode ? "whiteAlpha.200" : "gray.100"}
            bg={darkMode ? "#252542" : "white"}
          >
            <CardHeader p={5} pb={2}>
              <Heading fontSize="lg" fontWeight="bold" color={darkMode ? "white" : "gray.700"} display="flex" alignItems="center" gap={2}>
                <AddIcon color="purple.400" boxSize={3} />
                {t("label.quick_add_task")}
              </Heading>
            </CardHeader>
            <CardBody p={5} pt={2}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm" color={darkMode ? "gray.300" : "gray.600"}>{t("label.task_description")}</FormLabel>
                  <Input
                    {...register("todo")}
                    type="text"
                    placeholder={t("label.enter") + " " + t("label.task_description").toLowerCase()}
                    rounded={16}
                    bg={darkMode ? "#1a1a2e" : "gray.50"}
                    border="2px solid"
                    borderColor={darkMode ? "whiteAlpha.300" : "gray.100"}
                    color={darkMode ? "white" : "gray.700"}
                    _focus={{ borderColor: "purple.400", bg: darkMode ? "#252542" : "white" }}
                    _placeholder={{ color: "gray.400" }}
                  />
                </FormControl>

                <SimpleGrid columns={2} spacing={3} w="100%">
                  <Box>
                    <FormControl>
                      <FormLabel fontSize="sm" color={darkMode ? "gray.300" : "gray.600"}>{t("label.category")}</FormLabel>
                      <AnimatedSelect
                        value={categoryValue}
                        onChange={(val) => setValue("category", val)}
                        options={[
                          { label: t("label.personal"), value: "personal" },
                          { label: t("label.home"), value: "home" },
                          { label: t("label.work"), value: "work" },
                          { label: t("label.other"), value: "other" },
                        ]}
                        placeholder={t("label.category")}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel fontSize="sm" color={darkMode ? "gray.300" : "gray.600"}>{t("label.priority")}</FormLabel>
                      <AnimatedSelect
                        value={priorityValue}
                        onChange={(val) => setValue("priority", val)}
                        options={[
                          { label: t("label.low"), value: "low" },
                          { label: t("label.medium"), value: "medium" },
                          { label: t("label.high"), value: "high" },
                        ]}
                        placeholder={t("label.priority")}
                      />
                    </FormControl>
                  </Box>
                </SimpleGrid>

                <FormControl>
                  <FormLabel fontSize="sm" color={darkMode ? "gray.300" : "gray.600"}>{t("label.due_date")}</FormLabel>
                  <Input
                    type="date"
                    rounded={16}
                    bg={darkMode ? "#1a1a2e" : "gray.50"}
                    border="2px solid"
                    borderColor={darkMode ? "whiteAlpha.300" : "gray.100"}
                    color={darkMode ? "white" : "gray.700"}
                    _focus={{ borderColor: "purple.400", bg: darkMode ? "#252542" : "white" }}
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
                  {t("label.add_task")}
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card
            rounded={24}
            shadow={darkMode ? "none" : "0 4px 20px rgba(0,0,0,0.08)"}
            border="1px solid"
            borderColor={darkMode ? "whiteAlpha.200" : "gray.100"}
            bg={darkMode ? "#252542" : "white"}
          >
            <CardHeader p={5} pb={3}>
              <Box p={4} bg={darkMode ? "#1a1a2e" : "gray.50"} rounded={20}>
                <Grid templateColumns={{ base: "1fr", md: "1fr auto" }} gap={4}>
                  <GridItem>
                    <InputGroup size="lg">
                      <InputLeftElement pointerEvents="none">
                        <IoSearchCircleOutline size="22px" color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder={t("label.search_tasks")}
                        rounded={16}
                        bg={darkMode ? "#252542" : "white"}
                        border="2px solid"
                        borderColor={darkMode ? "whiteAlpha.300" : "gray.200"}
                        color={darkMode ? "white" : "gray.700"}
                        _focus={{ borderColor: "purple.400", boxShadow: "none" }}
                        _placeholder={{ color: "gray.400" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </InputGroup>
                  </GridItem>
                  <GridItem>
                    <Flex gap={2} bg={darkMode ? "#252542" : "white"} p={1} rounded={16} border="2px solid" borderColor={darkMode ? "whiteAlpha.300" : "gray.200"}>
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
                          onClick={() => setSelectStatus(item)}
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
                      borderColor={darkMode ? "gray.500" : "gray.300"}
                      onClick={() => setFilterSelectedCategory(item)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Flex>
              </Box>
            </CardHeader>

            <CardBody p={5} pt={2}>
              <Box>
                <Text fontWeight="bold" color={darkMode ? "gray.300" : "gray.600"} mb={4} fontSize="sm">
                  {filterTodo.length} {filterTodo.length === 1 ? t("label.task") : t("label.tasks")}
                </Text>

                {filterTodo.length === 0 ? (
                  <Box textAlign="center" py={10}>
                    <Text color="gray.400" fontSize="lg">{t("label.no_tasks")}</Text>
                    <Text color="gray.400" fontSize="sm">{t("label.add_new_task")}</Text>
                  </Box>
                ) : (
                  <VStack spacing={3} align="stretch">
                    {filterTodo.map((todo) => (
                      <Card
                        key={todo.id}
                        py={3}
                        px={4}
                        rounded={18}
                        shadow={darkMode ? "none" : "0 2px 8px rgba(0,0,0,0.06)"}
                        border="1px solid"
                        borderColor={todo.completed ? (darkMode ? "green.800" : "green.100") : (darkMode ? "whiteAlpha.200" : "gray.100")}
                        bg={todo.completed ? (darkMode ? "green.900" : "green.50") : (darkMode ? "#1a1a2e" : "white")}
                        transition="all 0.2s"
                        _hover={{ shadow: darkMode ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.1)", transform: "translateX(4px)" }}
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
                                bg={darkMode ? "#252542" : "white"}
                                color={darkMode ? "white" : "gray.700"}
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
                                color={todo.completed ? "gray.500" : (darkMode ? "white" : "gray.700")}
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
                                _hover={{ color: "purple.400", bg: darkMode ? "purple.900" : "purple.50" }}
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
                                _hover={{ color: "red.400", bg: darkMode ? "red.900" : "red.50" }}
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